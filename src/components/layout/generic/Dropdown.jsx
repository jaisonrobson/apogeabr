import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { isDesktop } from 'react-device-detect'

import { FlagContext, withFlagContext } from 'contexts'

const StyledDropdownToggle = styled(({
    maxHeight,
    height,
    width,
    color,
    textShadow,
    hoverColor,
    backgroundColor,
    hoverOpacity,
    hoverBackgroundColor,
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

    &:hover,
    &:focus,
    &:active {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''}
        ${({ hoverOpacity }) => hoverOpacity ? `opacity: ${hoverOpacity};` : ''}
        ${({ hoverBackgroundColor }) => hoverBackgroundColor ? `background-color: ${hoverBackgroundColor};` : ''}
    }
`

const Toggler = (props) => <StyledDropdownToggle {...props} />

const Menu = (props) => <DropdownMenu {...props} />

const Item = (props) => <DropdownItem {...props} />

const Dropdown = ({ containerStyle, ...props }) => {
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
            <UncontrolledDropdown                
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
