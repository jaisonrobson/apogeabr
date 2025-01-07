import React, { Fragment } from 'react'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom'

import {
    ParticleButton,
    Navbar,
    NavbarBrand,
    NavbarCollapsible,
    ApogeaHoverNavLink,
    UserDropdown
} from 'components'

const Top = () => {
    const session = useRouteLoaderData("root")

    return (
        <Navbar>
            {({ isShow }) => (
                <Fragment>
                    <NavbarBrand />

                    <NavbarCollapsible>
                        <NavbarCollapsible.Toggler />

                        <NavbarCollapsible.Collapse navbar>
                            <Container>
                                <Nav navbar className="justify-content-center" style={{ marginLeft: '-150px' }}>
                                    <NavItem>
                                        <ApogeaHoverNavLink to="/news/">
                                            Novidades
                                        </ApogeaHoverNavLink>
                                    </NavItem>

                                    <NavItem>
                                        <ApogeaHoverNavLink to="/library/">
                                            Biblioteca
                                        </ApogeaHoverNavLink>
                                    </NavItem>

                                    <NavItem>
                                        <ApogeaHoverNavLink to="/map/">
                                            Mapa
                                        </ApogeaHoverNavLink>
                                    </NavItem>

                                    <NavItem>
                                        <ApogeaHoverNavLink to="/about/">
                                            Sobre
                                        </ApogeaHoverNavLink>
                                    </NavItem>

                                    <NavItem>
                                        <ApogeaHoverNavLink to="/helpus/">
                                            Ajude nos
                                        </ApogeaHoverNavLink>
                                    </NavItem>

                                    <NavItem>
                                        <ApogeaHoverNavLink to="/halloffame/">
                                            <ParticleButton id="halloffame_button_particles">Hall da Fama</ParticleButton>
                                        </ApogeaHoverNavLink>
                                    </NavItem>
                                </Nav>
                            </Container>
                        </NavbarCollapsible.Collapse>
                    </NavbarCollapsible>

                    {
                        session?.token
                        ? (
                            <UserDropdown userName={session?.user?.name ? session?.user?.name : 'Novo Usuário'} />
                        )
                        : (
                            <Nav navbar className="justify-content-end">
                                <NavItem>
                                    <ApogeaHoverNavLink to="/user/">
                                        Entrar
                                    </ApogeaHoverNavLink>
                                </NavItem>
                            </Nav>
                        )
                    }                    
                </Fragment>
            )}
        </Navbar>
    )
}

export default Top
