import React from 'react'

import LibraryTopImage from 'images/layout/library/library_top.png'
import LibraryContentImage from 'images/layout/library/library_content.png'
import MagnifyingGlassImage from 'images/layout/library/magnifying_glass.png'

import {
    Container,
    Col,
    Row,
    NavLink,
    Dropdown,
    BookDisplay,
    Input,
    Form,
    Image,
    Button,
    SectionBackdrop,
    ScrollbarWrapperStyling,
    TitleH2,
    Nav,
    DrawerNavItem,
} from 'components'

const NewsNavLink = (props) => (
    <NavLink {...props} color="#e5d99c" textShadow="0px 0px" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${LibraryTopImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ paddingBottom: "0px", paddingTop: '10rem' }}
        >
            <Row>
                <Col>
                    <TitleH2 light>Biblioteca</TitleH2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form alignItems="center" padding="1rem">
                        <Input name="query" width="50%" backgroundColor="#E5D99C" borderRadius="8px" />

                        <Button
                            type="submit"
                            margin="15px"
                            backgroundColor="transparent"
                            border="0"
                            opacity="0.5"
                            onHover={{
                                backgroundColor: 'transparent',
                                color: 'transparent',
                                opacity: '1',
                            }}
                        >
                            <Image src={MagnifyingGlassImage} />
                        </Button>
                    </Form>
                </Col>
            </Row>
        </SectionBackdrop>

        <SectionBackdrop
            backgroundImage={`url(${LibraryContentImage})`}
            backgroundSize="30%"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ paddingTop: '2rem' }}
        >
            <Row>
                <Col padding="0px" paddingTop="2rem" maxWidth="300px">
                    <Form alignItems="center">
                        <Dropdown containerStyle={{ margin: 0, padding: 0}}>
                            <Dropdown.Toggler style={{ margin: 0, padding: 0, minWidth: '300px'  }}>
                                Missões
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
                                    Items
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

                                <Dropdown.Item>
                                    Habilidades
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    Caracteristicas
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
                                <NewsNavLink>
                                    Ocultistas
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Lanche do Guarda
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Brass Armor
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Old Backpack
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Wooden Staff
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Skull Ring
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Pesquisa de Seymour
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Entrega das Ferramentas
                                </NewsNavLink>
                            </DrawerNavItem>

                            <DrawerNavItem>
                                <NewsNavLink>
                                    Dark Robe
                                </NewsNavLink>
                            </DrawerNavItem>
                        </Nav>
                    </ScrollbarWrapperStyling>
                </Col>

                <Col padding="2rem">
                    <Row>
                        <BookDisplay />
                    </Row>
                </Col>
            </Row>
        </SectionBackdrop>
    </Container>
)

export default Content
