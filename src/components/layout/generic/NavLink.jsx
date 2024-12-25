import React from 'react'
import styled from 'styled-components'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'

const StyledNavLink = styled(({
    textShadow,
    color,
    hoverColor,
    hoverTextShadow,
    fontFamily,
    activeColor,
    activeTextShadow,
    ...props
}) => <ReactRouterNavLink {...props} />)`
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''};
    ${({ color }) => color ? `color: ${color};` : ''};
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : 'font-family: martel;'};
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ''};

    &:hover {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''};
        ${({ hoverTextShadow }) => hoverTextShadow ? `text-shadow: ${hoverTextShadow};` : ''};
    };

    &.active:first-child {
        ${({ activeColor }) => activeColor ? `color: ${activeColor};` : ''};
        ${({ activeTextShadow }) => activeTextShadow ? `text-shadow: ${activeTextShadow};` : ''};
    };
`

const NavLink = (props) => (
    <StyledNavLink
        to="/"
        {...props}
    />
)

export default NavLink
