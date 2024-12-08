import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled(({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    margin,
    padding,
    ...props
}) => <span {...props} />)`
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ''}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ''}
    ${({ margin }) => margin ? `margin: ${margin};` : ''}
    ${({ padding }) => padding ? `padding: ${padding};` : ''}
`

const Span = (props) => <StyledSpan {...props} />

export default Span
