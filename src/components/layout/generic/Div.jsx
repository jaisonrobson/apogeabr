import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledDiv = styled(({
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
    maxWidth,
    height,
    maxHeight,
    overflowWrap,
    backgroundColor,
    display,
    flexDirection,
    flexGrow,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    textAlign,
    position,
    zIndex,
    top,
    left,
    right,
    bottom,
    overflowX,
    transition,
    innerRef,
    ...props
}) => <div ref={innerRef} {...props}/>)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
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
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ``}

    ${({ top }) => top ? `top: ${top};` : ``}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ``}
    ${({ left }) => left ? `left: ${left};` : ``}
    ${({ right }) => right ? `right: ${right};` : ``}

    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
`
const Div = forwardRef((props, ref) => <StyledDiv innerRef={ref} {...props} />)

export default Div
