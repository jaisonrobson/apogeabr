import React from 'react'
import styled from 'styled-components'
import { Row as ReactstrapRow } from 'reactstrap'

const StyledRow = styled(({ padding, margin, marginTop, marginBottom, boxShadow, ...props }) => <ReactstrapRow {...props} />)`
    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
`

const Row = (props) => <StyledRow {...props} />

export default Row
