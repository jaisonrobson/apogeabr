import React from 'react'
import styled from 'styled-components'

import { NavLink } from 'components'

const UnrestrictedNavLink = (props) => (
    <NavLink
        href="/"
        color="white"
        hoverColor="#d4bf4e"
        {...props}
    />
)

export default UnrestrictedNavLink
