import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledInput = styled(({
    visibility,
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
    display,
    cursor,
    textAlign,
    flexGrow,
    innerRef,
    onHover = false,
    placeholderStyles = false,
    animation = false,
    ...props
}) => <input ref={innerRef} {...props} />)`
    ${({ visibility }) => visibility ? `visibility: ${visibility};` : ``}
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
    ${({ border }) => border ? `border: ${border};` : `border: 0;`}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : `border-bottom: 2px solid gray;`}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ cursor }) => cursor ? `cursor: ${cursor};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``}
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

    ${({ placeholderStyles }) => placeholderStyles ? `&::placeholder {
        ${placeholderStyles?.color ? `color: ${placeholderStyles?.color};` : ``}
        ${placeholderStyles?.fontSize ? `font-size: ${placeholderStyles?.fontSize};` : ``}
        ${placeholderStyles?.fontWeight ? `font-weight: ${placeholderStyles?.fontWeight};` : ``}
        ${placeholderStyles?.opacity ? `opacity: ${placeholderStyles?.opacity};` : ``}
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const Input = ({ validation, light, ...props }, ref) => (
    <StyledInput
        color={light ? "white" : "white"}
        backgroundColor={validation ? '#FFA5A560' : light ? "#FFFFFF60" : "#00000060"}
        onHover={{ backgroundColor: light ? "#4D4D4D" : '#CFCFCF' }}
        placeholderStyles={{ color: light ? "white" : 'white' }}
        innerRef={ref}
        {...props}
    />
)

export default forwardRef(Input)