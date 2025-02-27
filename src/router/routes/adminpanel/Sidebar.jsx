import React from 'react'
import { faCrown, faCircleUser, faGear, faPeopleGroup, faHouse, faHandshake, faImages, faPhotoFilm, faAddressCard, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Icon,
    UserDropdown,
} from 'components'

const Sidebar = () => (
    <Container height="100%" width="100%" paddingLeft="20px" display="flex" flexDirection="column">
        <Row>
            <Col
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                className="text-gray-400 unselectable fs-3"
            >
                <Icon
                    icon={faCrown}
                    color="inherit"
                    size="2x"
                />

                <span className="fs-1">
                    <strong>
                        Admin
                    </strong>
                </span>
            </Col>
        </Row>

        <hr style={{ color: 'white' }} />

        <Nav display="flex" flexDirection="column">
            <NavItem width="100%" margin="7px 0px" zIndex="1">
                <NavLink
                    to={ROUTES.HOME.path}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    opacity="1"
                    color="white"
                    hoverColor="gray"
                    textShadow="1px 1px 8px white"
                    hoverTextShadow="2px 2px 8px white"
                    activeColor="gray"
                    activeBackgroundColor="rgba(255,255,255,.7)"
                    activeBorderRadius="10px"
                    onHover={{ opacity: .5 }}
                    className="unselectable"
                    fontFamily="Retro Computer"
                    fontSize="12px"
                >
                    <Icon
                        icon={faHouse}
                        color="inherit"
                        size="2x"
                    />

                    Início
                </NavLink>
            </NavItem>
        </Nav>

        <hr style={{ color: 'white' }} />

        <Row className="mb-auto">
            <Col>
                <Nav display="flex" flexDirection="column">
                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_OVERVIEW.path}
                            display="flex"
                            justifyContent="space-evenly"
                            alignItems="center"
                            opacity="1"
                            color="white"
                            hoverColor="gray"
                            textShadow="1px 1px 8px white"
                            hoverTextShadow="2px 2px 8px white"
                            activeColor="gray"
                            activeBackgroundColor="rgba(255,255,255,.7)"
                            activeBorderRadius="10px"
                            onHover={{ opacity: .5 }}
                            className="unselectable"
                            fontFamily="Retro Computer"
                            fontSize="12px"
                        >
                            <Icon
                                icon={faAddressCard}
                                color="inherit"
                                size="2x"
                            />

                            Geral
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
        </Row>

        <hr style={{ color: 'white' }} />

        <Row>
            <Col>
                <UserDropdown
                    direction="up"
                    noAdmin
                    togglerProperties={{
                        color: 'white'
                    }}
                />
            </Col>
        </Row>
    </Container>
)

export default Sidebar