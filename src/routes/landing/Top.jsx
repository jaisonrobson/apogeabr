import React, { Fragment } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'

import userNoAvatarImage from 'images/userNoAvatar.png'

import Navbar from 'components/layout/Navbar'
import NavbarBrand from 'components/layout/NavbarBrand'
import NavbarCollapsible from 'components/layout/NavbarCollapsible'
import NavLink from 'components/layout/NavLink'
import Dropdown from 'components/layout/Dropdown'
import Icon from 'components/layout/Icon'
import Span from 'components/layout/Span'
import Image from 'components/layout/Image'

const Top = () => (
    <Navbar>
        {({ isShow }) => (
            <Fragment>
                <NavbarBrand>Apogea</NavbarBrand>

                <NavbarCollapsible>
                    <NavbarCollapsible.Toggler />

                    <NavbarCollapsible.Collapse navbar>
                        <Container>
                            <Nav navbar className="justify-content-center" style={{ marginLeft: '-150px' }}>
                                <NavItem>
                                    <NavLink>
                                        Novidades
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink>
                                        Biblioteca
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink>
                                        Sobre
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink>
                                        Ajude nos
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Container>
                    </NavbarCollapsible.Collapse>
                </NavbarCollapsible>
            </Fragment>
        )}
    </Navbar>
)

export default Top
