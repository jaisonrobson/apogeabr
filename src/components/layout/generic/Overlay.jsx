import React from 'react'
import styled from 'styled-components'

const StyledOverlay = styled(({
    position,
    width,
    height,
    top,
    bottom,
    left,
    right,
    padding,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    minWidth,
    background,
    minHeight,
    ...props
}) => <div {...props} />)`
    ${({ position }) => position ? `position: ${position};` : ''}
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}
    ${({ top }) => top ? `top: ${top};` : ''}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ''}
    ${({ left }) => left ? `left: ${left};` : ''}
    ${({ right }) => right ? `right: ${right};` : ''}
    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ background }) => background ? `background: ${background};` : 'background: #00000050;'}
`

const Overlay = (props) => <StyledOverlay {...props} />

export default Overlay