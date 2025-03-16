import React, { useState, Fragment } from 'react'
import {
    Modal as ReactstrapModal,
    ModalHeader as ReactstrapModalHeader,
    ModalBody as ReactstrapModalBody,
    ModalFooter as ReactstrapModalFooter
} from 'reactstrap'
import styled from 'styled-components'

import { Button } from 'components'

const StyledModal = styled(({
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
    background,
    backgroundColor,
    backgroundSize,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    display,
    alignItems,
    justifyContent,
    flexDirection,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapModal ref={innerRef} {...props} />)`
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
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.background ? `background: ${onHover?.background};` : ``}
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

const StyledModalHeader = styled(({
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
    background,
    backgroundColor,
    backgroundSize,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    display,
    alignItems,
    justifyContent,
    flexDirection,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapModalHeader ref={innerRef} {...props} />)`
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
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.background ? `background: ${onHover?.background};` : ``}
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

const StyledModalFooter = styled(({
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
    background,
    backgroundColor,
    backgroundSize,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    display,
    alignItems,
    justifyContent,
    flexDirection,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapModalFooter ref={innerRef} {...props} />)`
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
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.background ? `background: ${onHover?.background};` : ``}
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

const StyledModalBody = styled(({
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
    background,
    backgroundColor,
    backgroundSize,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    display,
    alignItems,
    justifyContent,
    flexDirection,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapModalBody ref={innerRef} {...props} />)`
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
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.background ? `background: ${onHover?.background};` : ``}
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
const ModalHeader = ({ light = false, ...props }) => (
    <StyledModalHeader
        onHover={{
            backgroundColor: light ? "#303030" : "#DBDBDB"
        }}
        backgroundColor={ light ? "#DBDBDB90" : "#30303090" }
        color={light ? "black" : "white"}
        {...props}
    />
)

const ModalBody = ({ light = false, ...props }) => (
    <StyledModalBody
        onHover={{
            backgroundColor: light ? "#303030" : "#DBDBDB"
        }}
        backgroundColor={ light ? "#DBDBDB90" : "#30303090" }
        color={light ? "black" : "white"}
        {...props}
    />
)

const ModalFooter = ({ light = false, ...props }) => (
    <StyledModalFooter
    onHover={{
        backgroundColor: light ? "#303030" : "#DBDBDB"
    }}
        backgroundColor={ light ? "#DBDBDB90" : "#30303090" }
        color={light ? "black" : "white"}
        {...props}
    />
)

const Modal = ({
    Component = Button,
    componentProps = {},
    onOpen = () => {},
    children,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = (e) => {
        e?.preventDefault()

        onOpen()

        setIsOpen(oldValue => !oldValue)
    }

    return (
        <Fragment>
            <Component onClick={toggle} {...componentProps} />

            <StyledModal isOpen={isOpen} toggle={toggle} fade={true} {...props}>
                {children({ isOpen, toggle })}
            </StyledModal>
        </Fragment>
    )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal