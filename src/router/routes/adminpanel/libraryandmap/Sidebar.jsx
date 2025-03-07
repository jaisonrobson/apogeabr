import React, { useContext, useEffect } from 'react'
import { faLanguage, faIcons, faLocationDot, faSitemap, faCalendar, faWind, faUsers, faQuestion, faFire, faSpaghettiMonsterFlying, faList, faGavel } from '@fortawesome/free-solid-svg-icons'
import { useRouteLoaderData } from 'react-router-dom'

import { FirstCollapsibleContext, SecondCollapsibleContext } from 'contexts'

import ROUTES from 'router/routes'

import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Icon,
} from 'components'

const Sidebar = () => {
    const { user } = useRouteLoaderData("root")
    const { setMarginRight } = useContext(FirstCollapsibleContext)
    const { marginRight } = useContext(SecondCollapsibleContext)

    useEffect(() => {
        setMarginRight(marginRight)

        return () => setMarginRight("0px")
    }, [marginRight])
    
    return (
        <Container height="100%" width="100%" paddingLeft="20px" display="flex" flexDirection="column">
            <Row>
                <Col
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                    className="text-gray-400 unselectable fs-3"
                >
                    <span className="fs-1">
                        <strong>
                            Opções
                        </strong>
                    </span>
                </Col>
            </Row>

            <hr style={{ color: 'white' }} />

            <Row className="mb-auto">
                <Col>                    
                    <Nav display="flex" flexDirection="column">
                        {
                            user?.privilege.value >= 20
                            ? (
                                <NavItem width="100%" margin="7px 0px" zIndex="1">
                                    <NavLink
                                        to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path}
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
                                            icon={faLanguage}
                                            color="inherit"
                                            size="2x"
                                        />

                                        Idiomas
                                    </NavLink>
                                </NavItem>
                            )
                            : (
                                null
                            )
                        }

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path}
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
                                    icon={faIcons}
                                    color="inherit"
                                    size="2x"
                                />

                                Icones
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS.path}
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
                                    icon={faLocationDot}
                                    color="inherit"
                                    size="2x"
                                />

                                Locais
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path}
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
                                    icon={faSitemap}
                                    color="inherit"
                                    size="2x"
                                />

                                Características
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS.path}
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
                                    icon={faCalendar}
                                    color="inherit"
                                    size="2x"
                                />

                                Eventos
                            </NavLink>
                        </NavItem>

                        {
                            user?.privilege.value < 20 ? null : (
                                <NavItem width="100%" margin="7px 0px" zIndex="1">
                                    <NavLink
                                        to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NATURES.path}
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
                                            icon={faWind}
                                            color="inherit"
                                            size="2x"
                                        />

                                        Naturezas
                                    </NavLink>
                                </NavItem>
                            )
                        }                        

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS.path}
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
                                    icon={faUsers}
                                    color="inherit"
                                    size="2x"
                                />

                                Npcs
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS.path}
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
                                    icon={faQuestion}
                                    color="inherit"
                                    size="2x"
                                />

                                Missões
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES.path}
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
                                    icon={faFire}
                                    color="inherit"
                                    size="2x"
                                />

                                Habilidades
                            </NavLink>
                        </NavItem>

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS.path}
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
                                    icon={faSpaghettiMonsterFlying}
                                    color="inherit"
                                    size="2x"
                                />

                                Monstros
                            </NavLink>
                        </NavItem>

                        { user?.privilege.value < 20 ? null : (
                            <NavItem width="100%" margin="7px 0px" zIndex="1">
                                <NavLink
                                    to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMCATEGORIES.path}
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
                                        icon={faList}
                                        color="inherit"
                                        size="2x"
                                    />

                                    Categorias de Itens
                                </NavLink>
                            </NavItem>
                        )}

                        <NavItem width="100%" margin="7px 0px" zIndex="1">
                            <NavLink
                                to={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path}
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
                                    icon={faGavel}
                                    color="inherit"
                                    size="2x"
                                />

                                Itens
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Sidebar