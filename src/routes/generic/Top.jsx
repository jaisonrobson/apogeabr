import React, { Fragment } from 'react'
import {
    Container,
    Nav,
    NavItem,
} from 'reactstrap'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

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
                                    <NavLink href="/famehall/">
                                        Hall da Fama
                                    </NavLink>
                                </NavItem>
                            </Nav>                            
                        </Container>
                    </NavbarCollapsible.Collapse>
                </NavbarCollapsible>

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
                            Option 1
                        </Dropdown.Item>

                        <Dropdown.Item>
                            Option 2
                        </Dropdown.Item>

                        <Dropdown.Item divider />

                        <Dropdown.Item>
                            Option 3
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Fragment>
        )}
    </Navbar>
)

export default Top
