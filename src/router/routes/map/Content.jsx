import React from 'react'

import MapTopImage from 'images/layout/map/map_top.png'
import MapContentImage from 'images/layout/map/map_content.jpg'

import { Container, Col, Row, NavLink, Dropdown, ScrollbarWrapperStyling, Form, ApogeaMap, SectionBackdrop, TitleH2, Nav, DrawerNavItem } from 'components'

const MapNavLink = (props) => (
    <NavLink {...props} color="#e5d99c" textShadow="0px 0px" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${MapTopImage})`}
            backgroundSize="40%"
            backgroundRepeat="repeat"
            backgroundPosition="50% 60%"
            contentAlignmentProps={{ paddingTop: '10rem' }}
        >
            <Row>
                <Col>
                    <TitleH2 light>Mapa</TitleH2>
                </Col>
            </Row>
        </SectionBackdrop>

        <SectionBackdrop
            backgroundImage={`url(${MapContentImage})`}
            backgroundSize="30%"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ paddingTop: '2rem' }}
        >
            <Row>
                <Col paddingTop='2rem' paddingBottom='5rem' maxWidth='300px'>
                    <Form alignItems='center'>
                        <Dropdown containerStyle={{ margin: 0, padding: 0}}>
                            <Dropdown.Toggler style={{ margin: 0, padding: 0, minWidth: '300px'  }}>
                                Locais
                            </Dropdown.Toggler>

                            <Dropdown.Menu dark end>
                                <Dropdown.Item header>
                                    Selecione uma categoria
                                </Dropdown.Item>
                                
                                <Dropdown.Item divider />

                                <Dropdown.Item>
                                    Missões
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Npcs
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Monstros
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Eventos
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Cidades
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Locais
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>

                    <ScrollbarWrapperStyling marginTop="15px">
                        <Nav
                            display="flex"
                            flexDirection="column"
                            className="justify-content-center"
                            textAlign='center'
                            margin="0px"
                            marginTop='20px'
                            padding="0px"
                        >
                            <DrawerNavItem>
                                <MapNavLink>
                                    Basile
                                </MapNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <MapNavLink>
                                    Dorosam
                                </MapNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <MapNavLink>
                                    Vecan
                                </MapNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <MapNavLink>
                                    Goblin Hills
                                </MapNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <MapNavLink>
                                    The Caravan
                                </MapNavLink>
                            </DrawerNavItem>
                        </Nav>
                    </ScrollbarWrapperStyling>
                </Col>

                <Col>
                    <Container padding="2rem" fluid>
                        <Row>
                            <ApogeaMap />
                        </Row>
                    </Container>

                </Col>
            </Row>
        </SectionBackdrop>
    </Container>
)

export default Content
