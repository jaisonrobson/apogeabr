import React, { Fragment } from 'react'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import {
    ParticleButton,
    Navbar,
    NavbarBrand,
    NavbarCollapsible,
    ApogeaHoverNavLink,
    Dropdown,
    Icon,
    Span,
    Image
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
                            <Dropdown>
                                <Dropdown.Toggler
                                    nav
                                >
                                    <Image
                                        src={userNoAvatarImage}
                                        className="rounded-circle"
                                        objectFit="contain"
                                        width="35px"
                                    />

                                    <Span marginLeft="10px" marginRight="5px">User</Span>

                                    <Icon paddingTop="1px" icon={faCaretDown} />
                                </Dropdown.Toggler>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        Perfil
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        Afiliar-se
                                    </Dropdown.Item>

                                    <Dropdown.Item divider />

                                    <Dropdown.Item>
                                        Sair
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
