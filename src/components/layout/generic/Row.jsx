import React from 'react'
import styled from 'styled-components'
import { Row as ReactstrapRow } from 'reactstrap'

const StyledRow = styled(({
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
    boxShadow,
    backgroundColor,
    backgroundImage,
    backgroundSize,
    backgroundRepeat,
    backgroundPosition,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    fontSize,
    width,
    minWidth,
    maxWidth,
    height,
    maxHeight,
    minHeight,
    justifyContent,
    flexDirection,
    flexGrow,
    flexBasis,
    alignItems,
    display,
    position,
    textAlign,
    gap,
    transition,
    animation,
    opacity,
    cursor,
    onHover = false,
    ...props
}) => <ReactstrapRow {...props} />)`
    ${({ transition }) => transition ? `transition: ${transition};` : ``}

    ${({ position }) => position ? `position: ${position};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}

    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}

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

    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}

    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ``}

    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ flexBasis }) => flexBasis ? `flex-basis: ${flexBasis};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}

    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ gap }) => gap ? `gap: ${gap};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}
    ${({ cursor }) => cursor ? `cursor: ${cursor};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
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
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.cursor ? `cursor: ${onHover?.cursor};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
        
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const Row = (props) => <StyledRow {...props} />

export default Row
