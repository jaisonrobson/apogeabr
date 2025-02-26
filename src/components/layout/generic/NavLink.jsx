import React from 'react'
import styled from 'styled-components'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'

import ROUTES from 'router/routes'

const StyledNavLink = styled(({
    zIndex,
    animation,
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
    activeBackgroundColor,
    activeBorderRadius,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    opacity,
    fontSize,
    onHover = {},
    ...props
}) => <ReactRouterNavLink {...props} />)`
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ''};
    ${({ display }) => display ? `display: ${display};` : ''};
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ''};
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''};
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''};
    
    ${({ width }) => width ? `width: ${width};` : ''};
    ${({ height }) => height ? `height: ${height};` : ''};

    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''};
    ${({ color }) => color ? `color: ${color};` : ''};
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ''};
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : 'font-family: martel;'};
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ''};
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ''};

    &:hover {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''};
        ${({ hoverTextShadow }) => hoverTextShadow ? `text-shadow: ${hoverTextShadow};` : ''};
        ${({ onHover }) => onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``};
        ${({ onHover }) => onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``};
        ${({ onHover }) => onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``};
    };

    &.active:first-child {
        ${({ activeColor }) => activeColor ? `color: ${activeColor};` : ''};
        ${({ activeTextShadow }) => activeTextShadow ? `text-shadow: ${activeTextShadow};` : ''};
        ${({ activeBackgroundColor }) => activeBackgroundColor ? `background-color: ${activeBackgroundColor};` : ''};
        ${({ activeBorderRadius }) => activeBorderRadius ? `border-radius: ${activeBorderRadius};` : ''};
    };
    
    &.active:hover {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''};
        ${({ hoverTextShadow }) => hoverTextShadow ? `text-shadow: ${hoverTextShadow};` : ''};
        ${({ onHover }) => onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``};
        ${({ onHover }) => onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``};
        ${({ onHover }) => onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``};
    };

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const NavLink = (props) => (
    <StyledNavLink
        to={ROUTES.HOME.path}
        {...props}
    />
)

export default NavLink
