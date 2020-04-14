import React from 'react';
import './ScrollToTop.scss'
import {useScrollPosition} from '@n8tb1t/use-scroll-position'


const ScrollToTop = () => {

	const [hideOnScroll, setHideOnScroll] = React.useState('d-none' )

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	useScrollPosition(
		({currPos }) => {
			if (currPos.y > 10 && currPos.y < 150) {
				setHideOnScroll('')
			} else if (currPos.y > 150) {
				setHideOnScroll('show')
			} else {
				setHideOnScroll('d-none')
			}
		},
		[],
		undefined,
		true
	)

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
