import React from 'react'
import styled from 'styled-components'

/* eslint-disable jsx-a11y/alt-text */
const StyledImage = styled(({
    objectFit,
    zIndex,
    padding,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    minWidth,
    width,
    height,
    overflowWrap,
    boxShadow,
    border,
    borderRadius,
    color,
    backgroundColor,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    flex,
    flexGrow,
    opacity,
    cursor,
    maskImage,
    innerRef,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <img alt='' ref={innerRef} {...props} />)`
    ${({ objectFit }) => objectFit ? `object-fit: ${objectFit};` : ''}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ''}
    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
    ${({ border }) => border ? `border: ${border};` : ``}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ flex }) => flex ? `flex: ${flex};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}
    ${({ cursor }) => cursor ? `cursor: ${cursor};` : ``}
    ${({ maskImage }) => maskImage ? `mask-image: ${maskImage};` : ``}

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

    ${({ active }) => active ? `&:active {
        ${active?.backgroundColor ? `background-color: ${active?.backgroundColor};` : ``}
        ${active?.color ? `color: ${active?.color};` : ``}
        ${active?.border ? `border: ${active?.border};` : ``}
        ${active?.borderBottom ? `border-bottom: ${active?.borderBottom};` : ``}
        ${active?.borderTop ? `border-top: ${active?.borderTop};` : ``}
        ${active?.borderLeft ? `border-left: ${active?.borderLeft};` : ``}
        ${active?.borderRight ? `border-right: ${active?.borderRight};` : ``}
        ${active?.boxShadow ? `box-shadow: ${active?.boxShadow};` : ``}
        ${active?.height ? `height: ${active?.height};` : ``}
        ${active?.width ? `width: ${active?.width};` : ``}
        ${active?.padding ? `padding: ${active?.padding};` : ``}
        ${active?.opacity ? `opacity: ${active?.opacity};` : ``}
        ${active?.margin ? `margin: ${active?.margin};` : ``}
        ${active?.animation ? `animation: ${active?.animation?.property}; ${active?.animation?.corpse}` : ``}
        
    };`: ``}

    &:visited {
        background-color: red;
    };

    &:focus {
        background-color: red;
    };

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const Image = (props) => <StyledImage className="unselectable" alt="" {...props} />

export default Image
