import React, { Fragment } from 'react'
import {
    Nav,
    NavItem,
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

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
                            <ApogeaHoverNavLink to={ROUTES.NEWS.path}>
                                Novidades
                            </ApogeaHoverNavLink>
                        </NavItem>

                        <NavItem>
                            <ApogeaHoverNavLink to={ROUTES.LIBRARY.path}>
                                Biblioteca
                            </ApogeaHoverNavLink>
                        </NavItem>

                        <NavItem>
                            <ApogeaHoverNavLink to={ROUTES.MAP.path}>
                                Mapa
                            </ApogeaHoverNavLink>
                        </NavItem>

                        <NavItem>
                            <ApogeaHoverNavLink to={ROUTES.ABOUT.path}>
                                Sobre
                            </ApogeaHoverNavLink>
                        </NavItem>

                        <NavItem>
                            <ApogeaHoverNavLink to={ROUTES.HELP_US.path}>
                                Ajude nos
                            </ApogeaHoverNavLink>
                        </NavItem>

                        <NavItem>
                            <ApogeaHoverNavLink to={ROUTES.HALL_OF_FAME.path}>
                                <ParticleButton id="halloffame_button_particles">Hall da Fama</ParticleButton>
                            </ApogeaHoverNavLink>
                        </NavItem>
                    </Nav>

                    {
                        session?.token
                        ? (
                            <UserDropdown
                                light
                                togglerProperties={{
                                    justifyContent: 'space-around',
                                    width: '200px',
                                    onHover: {
                                        color: 'gray',
                                    },
                                }}
                            />
                        )
                        : (
                            <Nav navbar className="justify-content-end">
                                <NavItem>
                                    <ApogeaHoverNavLink to={ROUTES.USER_LOGIN.path}>
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
