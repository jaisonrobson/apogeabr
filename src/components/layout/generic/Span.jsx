import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled(({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    margin,
    padding,
    fontFamily,
    fontSize,
    textAlign,
    textShadow,
    zIndex,
    ...props
}) => <span {...props} />)`
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ''}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ''}
    ${({ margin }) => margin ? `margin: ${margin};` : ''}
    ${({ padding }) => padding ? `padding: ${padding};` : ''}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ''}
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ''}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ''}
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ''}
`

const Span = (props) => <StyledSpan {...props} />

export default Span
