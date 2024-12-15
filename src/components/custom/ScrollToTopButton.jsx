import React from 'react'

import ScrollToTop from 'images/layout/generic/scrolltotop.png'

const ScrollToTopButton = () => (
    <img onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} src={ScrollToTop} width='35px' height='35px' style={{ zIndex: '99999999' }}/>
)

export default ScrollToTopButton