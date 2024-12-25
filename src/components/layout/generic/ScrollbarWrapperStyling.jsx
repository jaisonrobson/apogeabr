import React from 'react'
import styled from 'styled-components'

const StyledScrollBarWrapper = styled(({
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
    maxHeight,
    background,
    backgroundColor,
    scrollbarWidth,
    scrollbarTrackBackground,
    scrollbarThumbBackground,
    scrollbarThumbHoverBackground,
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
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ background }) => background ? `background: ${background};` : ''}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ''}

    ${({ overflow }) => overflow ? `overflow: ${overflow};` : ``}
    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}
    ${({ overflowY }) => overflowY ? `overflow-y: ${overflowY};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}

        /* width */
    &::-webkit-scrollbar {
        ${({ scrollbarWidth }) => scrollbarWidth ? `width: ${scrollbarWidth};` : 'width: 10px;'}
    }

    /* Track */
    &::-webkit-scrollbar-track {
        ${({ scrollbarTrackBackground }) => scrollbarTrackBackground ? `background: ${scrollbarTrackBackground};` : 'background: #f1f1f1;'}
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888; 
        ${({ scrollbarThumbBackground }) => scrollbarThumbBackground ? `background: ${scrollbarThumbBackground};` : 'background: #888;'}
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        ${({ scrollbarThumbHoverBackground }) => scrollbarThumbHoverBackground ? `background: ${scrollbarThumbHoverBackground};` : 'background: #555;'}
    }
`

const ScrollbarWrapperStyling = (props) => <StyledScrollBarWrapper margin="0px" padding="0px" maxHeight="800px" overflow="auto" {...props} />

export default ScrollbarWrapperStyling