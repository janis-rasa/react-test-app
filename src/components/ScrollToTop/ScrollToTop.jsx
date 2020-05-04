import React from 'react';
import './ScrollToTop.scss'

const ScrollToTop = () => {

	const [hideOnScroll, setHideOnScroll] = React.useState('d-none' )

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	const useScrollPosition = () => {
		let position = window.pageYOffset
		if (position > 10 && position < 150) {
			setHideOnScroll('')
		} else if (position > 150) {
			setHideOnScroll('show')
		} else {
			setHideOnScroll('d-none')
		}
	}

	React.useEffect(() => {
		window.addEventListener('scroll', useScrollPosition, { passive: true })

		return () => {
			window.removeEventListener('scroll', useScrollPosition)
		}
	}, [])

	return (
		<React.Fragment>
			<button
				type="button"
				className={hideOnScroll + ' scroll-top'}
				onClick={handleScrollToTop}
			>
				<span className="sr-only">Scroll to top</span>
			</button>
		</React.Fragment>
	);
}

export default ScrollToTop
