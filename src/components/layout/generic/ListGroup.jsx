import React, { forwardRef } from 'react'
import {
    ListGroup as ReactstrapListGroup,
    ListGroupItem as ReactstrapListGroupItem,
} from 'reactstrap'
import styled from 'styled-components'

const StyledListGroup = styled(({
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
    backgroundColor,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    flex,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapListGroup ref={innerRef} {...props} />)`
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
    ${({ border }) => border ? `border: ${border};` : `border: 2px solid gray;`}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : `background-color: #00000030;`}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ flex }) => flex ? `flex: ${flex};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
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
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
        
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const StyledListGroupItem = styled(({
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
    backgroundColor,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    flex,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapListGroupItem ref={innerRef} {...props} />)`
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
    ${({ border }) => border ? `border: ${border};` : `border: 2px solid gray;`}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : `background-color: #00000030;`}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ flex }) => flex ? `flex: ${flex};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
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
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
        
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const ListGroupItem = forwardRef((props, ref) => <StyledListGroupItem innerRef={ref} {...props} />)

const ListGroup = forwardRef((props, ref) => <StyledListGroup innerRef={ref} {...props} />)

ListGroup.Item = ListGroupItem

export default ListGroup