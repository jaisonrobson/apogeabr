import React from 'react'

import ROUTES from 'router/routes'

import { NavLink } from 'components'

const ApogeaHoverNavLink = (props) => (
    <NavLink
        to={ROUTES.HOME.path}
        color="white"
        hoverColor="#d4bf4e"
        hoverTextShadow="1px 1px 8px yellow"
        activeColor="#d4bf4e"
        {...props}
    />
)

export default ApogeaHoverNavLink
