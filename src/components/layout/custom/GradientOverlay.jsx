import React from 'react'

import { Overlay } from 'components'

const GradientOverlay = ({ background, ...props }) =>
    <Overlay
        {...props}
        background={background ? background : "linear-gradient(to bottom, #000000, #00000050 10%, #00000050 90%, #000000);"}
    />

export default GradientOverlay