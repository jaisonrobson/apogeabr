import React, { Fragment } from 'react'
import {
    Nav,
    NavItem,
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom'

import {
    ParticleButton,
    Navbar,
    NavbarBrand,
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

                    <Nav navbar className="justify-content-center">
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

                    {
                        session?.token
                        ? (
                            <UserDropdown
                                userName={session?.user?.name}
                                togglerProperties={{
                                    color: "white",
                                    justifyContent: 'space-around',
                                    width: '200px',
                                }}
                            />
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
