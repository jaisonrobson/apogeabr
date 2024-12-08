import React from 'react'
import styled from 'styled-components'
import { NavLink as ReactstrapNavLink } from 'reactstrap'

const StyledNavLink = styled(({ textShadow, color, ...props }) => <ReactstrapNavLink {...props} />)`
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''};
    ${({ color }) => color ? `color: ${color};` : ''};
`

const NavLink = (props) => {
    return (
        <StyledNavLink
            href="/"
            {...props}
        />
    )
}

export default NavLink
