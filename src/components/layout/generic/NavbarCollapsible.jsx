import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import { Collapse as ReactstrapCollapse, NavbarToggler as ReactstrapNavbarToggler } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { FlagContext, withFlagContext } from 'contexts'

const StyledNavbarToggler = styled(({ color, ...props }) => <ReactstrapNavbarToggler {...props} />)`
    ${({ color }) => color ? `color: ${color};` : ''}
`

const Toggler = ({ children, ...rest }) => {
    const { isOpen, setIsOpen } = useContext(FlagContext)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <StyledNavbarToggler onClick={toggle} {...rest}>
            <FontAwesomeIcon icon={faBars} />

            {children}
        </StyledNavbarToggler>
    )
}

const Collapse = ({ children, ...rest }) => {
    const { isOpen } = useContext(FlagContext)

    return (
        <ReactstrapCollapse isOpen={isOpen} {...rest}>
            {children}
        </ReactstrapCollapse>
    )
}

const NavbarCollapsible = ({ children }) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

NavbarCollapsible.Toggler = Toggler
NavbarCollapsible.Collapse = Collapse

export default withFlagContext(
    NavbarCollapsible,
    {
        flag: 'isOpen',
        initialValue: false,
    },
)
