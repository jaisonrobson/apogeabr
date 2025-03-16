import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { isDesktop } from 'react-device-detect'

import { FlagContext, withFlagContext } from 'contexts'

const StyledUncontrolledDropdown = styled(({
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflowWrap,
    color,
    fontFamily,
    backgroundColor,
    display,
    flexDirection,
    flexGrow,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    textAlign,
    position,
    zIndex,
    top,
    left,
    right,
    bottom,
    overflowX,
    transition,
    maskImage,
    maskSize,
    animation,
    onHover = false,
    ...props
}) => <UncontrolledDropdown {...props}/>)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ''}
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ``}

    ${({ top }) => top ? `top: ${top};` : ``}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ``}
    ${({ left }) => left ? `left: ${left};` : ``}
    ${({ right }) => right ? `right: ${right};` : ``}

    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
    ${({ maskImage }) => maskImage ? `mask-image: ${maskImage};` : ``}
    ${({ maskSize }) => maskSize ? `mask-size: ${maskSize};` : ``}

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

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const StyledDropdownToggle = styled(({
    maxHeight,
    height,
    width,
    color,
    textShadow,
    backgroundColor,
    onHover = false,
    fontFamily,
    fontSize,
    componentColor = "secondary",
    display,
    flexDirection,
    flexGrow,
    justifyContent,
    alignItems,
    ...props
}) => <DropdownToggle color={componentColor} {...props} />)`
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ color }) => color ? `color: ${color};` : ''}
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ''}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ''}
    ${({ fontSize }) => fontSize ? `font-size: ${fontSize};` : ''}

    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

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
`

const StyledDropdownMenu = styled(({
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflowWrap,
    color,
    backgroundColor,
    display,
    flexDirection,
    flexGrow,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    textAlign,
    position,
    zIndex,
    top,
    left,
    right,
    bottom,
    overflowX,
    transition,
    maskImage,
    maskSize,
    animation,
    onHover = false,
    ...props
}) => <DropdownMenu {...props}/>)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ``}

    ${({ top }) => top ? `top: ${top};` : ``}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ``}
    ${({ left }) => left ? `left: ${left};` : ``}
    ${({ right }) => right ? `right: ${right};` : ``}

    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
    ${({ maskImage }) => maskImage ? `mask-image: ${maskImage};` : ``}
    ${({ maskSize }) => maskSize ? `mask-size: ${maskSize};` : ``}

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

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const StyledDropdownItem = styled(({
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflowWrap,
    color,
    backgroundColor,
    display,
    flexDirection,
    flexGrow,
    justifyContent,
    alignItems,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    textAlign,
    position,
    zIndex,
    top,
    left,
    right,
    bottom,
    overflowX,
    transition,
    maskImage,
    maskSize,
    animation,
    onHover = false,
    ...props
}) => <DropdownItem {...props}/>)`
    ${({ display }) => display ? `display: ${display};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ``}

    ${({ top }) => top ? `top: ${top};` : ``}
    ${({ bottom }) => bottom ? `bottom: ${bottom};` : ``}
    ${({ left }) => left ? `left: ${left};` : ``}
    ${({ right }) => right ? `right: ${right};` : ``}

    ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ``}

    ${({ transition }) => transition ? `transition: ${transition};` : ``}
    ${({ maskImage }) => maskImage ? `mask-image: ${maskImage};` : ``}
    ${({ maskSize }) => maskSize ? `mask-size: ${maskSize};` : ``}

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

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`


const Toggler = ({ light = false, ...props }) => (
    <StyledDropdownToggle
        color={!light ? "black" : "white"}
        backgroundColor={!light ? '#00000030' : "#ffffff30"}
        onHover={{
            backgroundColor: !light ? '#00000080' : "#ffffff80",
            color: !light ? "white" : "black",
        }}
        {...props}
    />
)

const Menu = ({ light = false, ...props }) => (
    <StyledDropdownMenu
        backgroundColor={!light ? '#ffffff90' : "#ffffff80"}
        {...props}
    />
)

const Item = ({ light = false, ...props }) => (
    <StyledDropdownItem
        color={!light ? "black" : "white"}
        onHover={{
            backgroundColor: !light ? '#00000080' : "#ffffff80",
            color: !light ? "white" : "black",
        }}
        {...props}
    />
)

const Dropdown = ({ containerStyle, light = false, ...props }) => {
    const ref = useRef(null)
    const { isOpen, setIsOpen } = useContext(FlagContext)
    const toggle = () => setIsOpen(!isOpen)

    useEffect(() => {
        if (!isDesktop) return false

        const over = () => setIsOpen(true)
        const leave = () => setIsOpen(false)

        const current = ref.current

        if (ref && current) {
            current.addEventListener("mouseover", over)
            current.addEventListener("mouseleave", leave)
        }

        return () => {
            if (ref && current) {
                current.removeEventListener("mouseover", over)
                current.removeEventListener("mouseleave", leave)
            }
        }
    }, [ref, setIsOpen])

    return (
        <div ref={ref} style={containerStyle}>
            <StyledUncontrolledDropdown
                backgroundColor={!light ? '#00000020' : "#ffffff40"}
                color={!light ? "black" : "white"}
                onHover={{
                    backgroundColor: !light ? '#00000080' : "#ffffff80",
                    color: !light ? "white" : "black",
                }}
                isOpen={isOpen}
                toggle={toggle}
                {...props}
            />
        </div>
    )
}

Dropdown.Toggler = Toggler
Dropdown.Menu = Menu
Dropdown.Item = Item

export default withFlagContext(
    Dropdown,
    {
        flag: 'isOpen',
        initialValue: false,
    },
)