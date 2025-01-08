import React, { useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { faCircleUser, faGear, faPeopleGroup, faHouse, faHandshake, faImages, faPhotoFilm, faAddressCard } from '@fortawesome/free-solid-svg-icons'

import { CollapsibleContext } from 'contexts'

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
    const { setNavigatedRouteNickname } = useContext(CollapsibleContext)
    
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
                        to="/"
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
                                to="/user/profile/overview/"
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
                                onClick={() => setNavigatedRouteNickname("Geral")}
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
                                to="configuration/"
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
                                onClick={() => setNavigatedRouteNickname("Configurações")}
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
                                to="characters/"
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
                                onClick={() => setNavigatedRouteNickname("Personagens")}
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
                                to="affiliated/"
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
                                onClick={() => setNavigatedRouteNickname("Afiliado")}
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
                                to="images/"
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
                                onClick={() => setNavigatedRouteNickname("Imagens")}
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
                                to="videos/"
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
                                onClick={() => setNavigatedRouteNickname("Vídeos")}
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
                        userName={session?.user?.name}
                        noProfile
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar