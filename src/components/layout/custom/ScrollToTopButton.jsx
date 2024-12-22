import React from 'react'
import ScrollToTop from "react-scroll-to-top"

import ScrollToTopImage from 'images/layout/generic/scrolltotop.png'

const ScrollToTopButtonContent = () => (
    <img onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} src={ScrollToTopImage} width='35px' height='35px' style={{ zIndex: '99999999' }}/>
)

const ScrollToTopButton = () => (
    <ScrollToTop smooth component={<ScrollToTopButtonContent />} width='35' height='35' style={{ padding: 0, margin: 0, backgroundColor: 'gray', zIndex: '9999999'}} />
)


export default ScrollToTopButton