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
                <NavbarBrand>View</NavbarBrand>

                <NavbarCollapsible>
                    <NavbarCollapsible.Toggler />

                    <NavbarCollapsible.Collapse navbar>
                        <Container>
                            <Nav navbar className="justify-content-center">
                                <NavItem>
                                    <NavLink>
                                        Movies
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink>
                                        Series
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
