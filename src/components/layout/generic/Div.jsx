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
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflowWrap,
    backgroundColor,
    display,
    flexDirection,
    gap,
    flexGrow,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    textAlign,
    position,
    zIndex,
    top,
    left,
    right,
    bottom,
    overflowX,
    transition,
    maskImage,
    maskSize,
    animation,
    innerRef,
    onHover = false,
    ...props
}) => <div ref={innerRef} {...props}/>)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ gap }) => gap ? `gap: ${gap};` : ``}

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
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ``}

    ${({ top }) => top ? `top: ${top};` : ``}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ``}
    ${({ left }) => left ? `left: ${left};` : ``}
    ${({ right }) => right ? `right: ${right};` : ``}

    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
    ${({ maskImage }) => maskImage ? `mask-image: ${maskImage};` : ``}
    ${({ maskSize }) => maskSize ? `mask-size: ${maskSize};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``}
        ${onHover?.color ? `color: ${onHover?.color};` : ``}
        ${onHover?.border ? `border: ${onHover?.border};` : ``}
        ${onHover?.borderBottom ? `border-bottom: ${onHover?.borderBottom};` : ``}
        ${onHover?.borderTop ? `border-top: ${onHover?.borderTop};` : ``}
        ${onHover?.borderLeft ? `border-left: ${onHover?.borderLeft};` : ``}
        ${onHover?.borderRight ? `border-right: ${onHover?.borderRight};` : ``}
        ${onHover?.boxShadow ? `box-shadow: ${onHover?.boxShadow};` : ``}
        ${onHover?.height ? `height: ${onHover?.height};` : ``}
        ${onHover?.width ? `width: ${onHover?.width};` : ``}
        ${onHover?.padding ? `padding: ${onHover?.padding};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`
const Div = forwardRef((props, ref) => <StyledDiv innerRef={ref} {...props} />)

export default Div
