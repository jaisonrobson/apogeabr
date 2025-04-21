import React from 'react'
import { faCrown, faHouse, faAddressCard, faBook, faNewspaper, faFlag, faBullhorn, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Icon,
    Span,
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

                <Span className="fs-1" zIndex="1">
                    <strong>
                        Admin
                    </strong>
                </Span>
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

                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP.path}
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
                                icon={faBook}
                                color="inherit"
                                size="2x"
                            />

                            Biblioteca & Mapa
                        </NavLink>
                    </NavItem>

                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_NEWS.path}
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
                                icon={faNewspaper}
                                color="inherit"
                                size="2x"
                            />

                            Notícias
                        </NavLink>
                    </NavItem>

                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_PRESENTATIONS.path}
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
                                icon={faFlag}
                                color="inherit"
                                size="2x"
                            />

                            Apresentações
                        </NavLink>
                    </NavItem>

                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_COMMUNIQUES.path}
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
                                icon={faBullhorn}
                                color="inherit"
                                size="2x"
                            />

                            Comunicados
                        </NavLink>
                    </NavItem>

                    <NavItem width="100%" margin="7px 0px" zIndex="1">
                        <NavLink
                            to={ROUTES.USER_ADMIN_PANEL_CHARACTERS.path}
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

        <hr style={{ color: 'white' }} />

        <Row>
            <Col>
                <UserDropdown
                    direction="up"
                    noAdmin
                    light
                    togglerProperties={{
                        onHover: {
                            color: 'gray',
                        },
                    }}
                />
            </Col>
        </Row>
    </Container>
)

export default Sidebar