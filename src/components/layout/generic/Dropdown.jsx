import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { isDesktop } from 'react-device-detect'

import { FlagContext, withFlagContext } from 'contexts'

const StyledDropdownToggle = styled(({ color, textShadow, hoverColor, ...props }) => <DropdownToggle {...props} />)`
    ${({ color }) => color ? `color: ${color};` : ''}
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''}

    &:hover,
    &:focus,
    &:active {
        ${({ hoverColor }) => hoverColor ? `color: ${hoverColor};` : ''}
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

        if (ref && ref.current) {
            ref.current.addEventListener("mouseover", over)
            ref.current.addEventListener("mouseleave", leave)
        }

        return () => {
            if (ref && ref.current) {
                ref.current.removeEventListener("mouseover", over)
                ref.current.removeEventListener("mouseleave", leave)
            }
        }
    }, [ref])

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
