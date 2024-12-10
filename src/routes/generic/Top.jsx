import React, { Fragment } from 'react'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'

import Navbar from 'components/layout/Navbar'
import NavbarBrand from 'components/layout/NavbarBrand'
import NavbarCollapsible from 'components/layout/NavbarCollapsible'
import NavLink from 'components/layout/NavLink'

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
                                    <NavLink href="/news/">
                                        Novidades
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink href="/library/">
                                        Biblioteca
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink>
                                        Mapa
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
