import smoothScroll from 'smoothscroll-polyfill'

const scrollToElement = (element, scrollSuccess) => {

	smoothScroll.polyfill()

	Element.prototype.scrollIntoViewPromise = function (options) {
		this.scrollIntoView(options)
		let parent = this
		return {
			then: function (x) {
				const intersectionObserver = new IntersectionObserver((entries) => {
					let [entry] = entries
					if (entry.isIntersecting) {
						setTimeout(() => {
							x()
							intersectionObserver.unobserve(parent)
						}, 100)
					}
				});
				intersectionObserver.observe(parent)
			}
		};
	}

	setTimeout(() => {
		element.scrollIntoViewPromise({behavior: 'smooth', block: 'start'})
			.then(() => {
				scrollSuccess(true)
			})
	}, 100)
}

export default scrollToElement