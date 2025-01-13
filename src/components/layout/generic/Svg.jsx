import React from 'react'
import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

const StyledSvg = styled(({
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
    flex,
    flexGrow,
    flexDirection,
    justifyContent,
    alignItems,
    overflow,
    ...props
}) => <ReactSVG {...props} />)`
    ${({ flex }) => flex ? `flex: ${flex};` : ``}
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
    ${({ overflow }) => overflow ? `overflow: ${overflow};` : ``}
`

const Svg = ({ width = "20px", height = "20px", size = undefined, ...props }) => <StyledSvg beforeInjection={(svg) => svg.setAttribute('style', `width: ${size || width}; height: ${size || height};`)} {...props} />

export default Svg
