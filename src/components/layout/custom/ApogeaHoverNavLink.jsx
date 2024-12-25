import React from 'react'

import { NavLink } from 'components'

const ApogeaHoverNavLink = (props) => (
    <NavLink
        to="/"
        color="white"
        hoverColor="#d4bf4e"
        hoverTextShadow="1px 1px 8px yellow"
        activeColor="#d4bf4e"
        {...props}
    />
)

export default ApogeaHoverNavLink
