import React from 'react'
import styled from 'styled-components'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'

const StyledNavLink = styled(({
    textShadow,
    width,
    height,
    backgroundColor,
    color,
    hoverColor,
    hoverTextShadow,
    fontFamily,
    activeColor,
    activeTextShadow,
    display,
    justifyContent,
    ...props
}) => <ReactRouterNavLink {...props} />)`
    ${({ display }) => display ? `display: ${display};` : ''};
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''};
    
    ${({ width }) => width ? `width: ${width};` : ''};
    ${({ height }) => height ? `height: ${height};` : ''};

    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''};
    ${({ color }) => color ? `color: ${color};` : ''};
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ''};
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
    
    &.active:hover {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''};
        ${({ hoverTextShadow }) => hoverTextShadow ? `text-shadow: ${hoverTextShadow};` : ''};
    };
`

const NavLink = (props) => (
    <StyledNavLink
        to="/"
        {...props}
    />
)

export default NavLink
