import React, { Fragment, useContext } from 'react'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { ReducerContext } from 'contexts'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import {
    ParticleButton,
    Navbar,
    NavbarBrand,
    NavbarCollapsible,
    NavLink,
    Dropdown,
    Icon,
    Span,
    Image
} from 'components'

const Top = () => {
    const state = useContext(ReducerContext)

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
                                        <NavLink href="/map/">
                                            Mapa
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink href="/about/">
                                            Sobre
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink href="/helpus/">
                                            Ajude nos
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink href="/halloffame/">
                                            <ParticleButton id="halloffame_button_particles">Hall da Fama</ParticleButton>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Container>
                        </NavbarCollapsible.Collapse>
                    </NavbarCollapsible>

                    {
                        state?.user
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
                                    <NavLink href="/login/">
                                        Entrar
                                    </NavLink>
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
