import React from 'react'
import styled from 'styled-components'
import { Container as ReactstrapContainer } from 'reactstrap'

const StyledContainer = styled(({
    padding,
    margin,
    width,
    height,
    justifyContent,
    flexDirection,
    alignItems,
    display,
    ...props
}) => <ReactstrapContainer {...props} />)`
    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
`

const Container = (props) => <StyledContainer {...props} />

export default Container
