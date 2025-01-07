import React from 'react'
import { faCircleUser, faGear, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

import {
    Container,
    Row,
    Col,
    ApogeaHoverNavLink,
    TitleH2,
    Nav,
    NavItem,
    NavLink,
    Icon,
} from 'components'

const Sidebar = () => (
    <Container height="100%" width="100%" paddingLeft="20px" display="flex" flexDirection="column">
        <Row>
            <Col
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                className="text-gray-800 unselectable fs-3"
            >
                <Icon
                    icon={faCircleUser}
                    color="inherit"
                    size="2x"
                />

                <span className="fs-1">
                    <strong>
                        Perfil
                    </strong>
                </span>
            </Col>
        </Row>

        <hr />

        <Row className="mb-auto">
            <Col>
                <Nav display="flex" flexDirection="column">
                    <NavItem width="100%" margin="7px 0px">
                        <NavLink
                            to="#"
                            display="flex"
                            justifyContent="space-evenly"
                            alignItems="center"
                            opacity="1"
                            color="black"
                            hoverColor="white"
                            textShadow="1px 1px 8px white"
                            hoverTextShadow="2px 2px 8px black"
                            activeColor="gray"
                            activeBackgroundColor="rgba(255,255,255,.7)"
                            activeBorderRadius="10px"
                            onHover={{ opacity: .5 }}
                            className="unselectable"
                            fontFamily="Retro Computer"
                            fontSize="12px"
                            active
                        >
                            <Icon
                                icon={faGear}
                                color="inherit"
                                size="2x"
                            />

                            Configuracoes
                        </NavLink>
                    </NavItem>

                    <NavItem width="100%" margin="7px 0px">
                        <NavLink
                            to="#"
                            display="flex"
                            justifyContent="space-evenly"
                            alignItems="center"
                            opacity="1"
                            color="black"
                            hoverColor="white"
                            textShadow="1px 1px 8px white"
                            hoverTextShadow="2px 2px 8px black"
                            activeColor="gray"
                            activeBackgroundColor="rgba(255,255,255,.7)"
                            activeBorderRadius="10px"
                            onHover={{ opacity: .5 }}
                            className="unselectable"
                            fontFamily="Retro Computer"
                            fontSize="12px"
                            active
                        >
                            <Icon
                                icon={faPeopleGroup}
                                color="inherit"
                                size="2x"
                            />

                            Personagens
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
        </Row>

        <hr />

        <div className="dropdown">
            <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu text-small shadow">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    </Container>
)

export default Sidebar