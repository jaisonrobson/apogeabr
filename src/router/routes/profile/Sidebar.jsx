import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { faCircleUser, faGear, faPeopleGroup, faHouse, faHandshake, faImages, faPhotoFilm, faAddressCard, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'

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

const Sidebar = () => {
    const session = useRouteLoaderData("root")
    
    return (
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

            <Nav display="flex" flexDirection="column">
                <NavItem width="100%" margin="7px 0px">
                    <NavLink
                        to={ROUTES.HOME.path}
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

            <hr />

            <Row className="mb-auto">
                <Col>
                    <Nav display="flex" flexDirection="column">
                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_OVERVIEW.path}
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
                            >
                                <Icon
                                    icon={faAddressCard}
                                    color="inherit"
                                    size="2x"
                                />

                                Geral
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_CONFIGURATION.path}
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
                            >
                                <Icon
                                    icon={faMoneyBillWaveAlt}
                                    color="inherit"
                                    size="2x"
                                />

                                Pagamentos
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_CONFIGURATION.path}
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
                                to={ROUTES.USER_PROFILE_CHARACTERS.path}
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
                            >
                                <Icon
                                    icon={faPeopleGroup}
                                    color="inherit"
                                    size="2x"
                                />

                                Personagens
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_AFFILIATED.path}
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
                            >
                                <Icon
                                    icon={faHandshake}
                                    color="inherit"
                                    size="2x"
                                />

                                Afiliado
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_IMAGES.path}
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
                            >
                                <Icon
                                    icon={faImages}
                                    color="inherit"
                                    size="2x"
                                />

                                Imagens
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px">
                            <NavLink
                                to={ROUTES.USER_PROFILE_VIDEOS.path}
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
                            >
                                <Icon
                                    icon={faPhotoFilm}
                                    color="inherit"
                                    size="2x"
                                />

                                Vídeos
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>

            <hr />

            <Row>
                <Col>
                    <UserDropdown
                        direction="up"
                        noProfile
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar