import React from 'react'
import styled from 'styled-components'
import { Nav as ReactstrapNav } from 'reactstrap'

const StyledNav = styled(({
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    minWidth,
    maxWidth,
    height,
    maxHeight,
    overflowWrap,
    boxShadow,    
    color,
    backgroundColor,
    border,
    borderRadius,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    fontWeight,
    fontSize,
    display,
    flexGrow,
    flexDirection,
    justifyContent,
    alignItems,
    overflow,
    overflowX,
    overflowY,
    textAlign,
    innerRef,
    ...props
}) => <ReactstrapNav ref={innerRef} {...props} />)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}    
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}

    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}

    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}

    ${({ border }) => border ? `border: ${border};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}

    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ fontWeight }) => fontWeight ? `font-weight: ${fontWeight};` : ``}
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ``}
    ${({ overflow }) => overflow ? `overflow: ${overflow};` : ``}
    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}
    ${({ overflowY }) => overflowY ? `overflow-y: ${overflowY};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
`

const Nav = (props) => <StyledNav {...props} />

export default Nav
