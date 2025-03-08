import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledHR = styled(({
    position,
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflowWrap,
    color,
    backgroundColor,
    display,
    flexDirection,
    flexGrow,
    flexShrink,
    flexBasis,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    textAlign,
    textShadow,
    transition,
    gap,
    fontFamily,
    fontSize,
    ...props
}) => <hr {...props}/>)`
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ flexShrink }) => flexShrink ? `flex-shrink: ${flexShrink};` : ``}
    ${({ flexBasis }) => flexBasis ? `flex-basis: ${flexBasis};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ``}
    ${({ gap }) => gap ? `gap: ${gap};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
`

const HR = ({ light = false, ...props }) => <StyledHR color={light ? "white" : "black"} {...props} />

export default HR
