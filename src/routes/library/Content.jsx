import React from 'react'
import styled from 'styled-components'
import {
    Nav,
    NavItem,
} from 'reactstrap'

import LibraryTopImage from 'images/layout/library/library_top.webp'
import LibraryContentImage from 'images/layout/library/library_content.webp'
import MagnifyingGlassImage from 'images/layout/library/magnifying_glass.png'

import { Container, Col, Row, NavLink, Dropdown, BookDisplay, Input, Form, Image, Button, SectionBackdrop } from 'components'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const StyledContainer = styled((props) => <Container {...props} />)`
    margin-top: 2rem;
`

const StyledNav = styled((props) => <Nav {...props} />)`
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`

const NewsNavLink = (props) => (
    <NavLink {...props} color="#e5d99c" textShadow="0px 0px" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${LibraryTopImage})`}
            backgroundSize="30%"
            backgroundRepeat="repeat-x"
            backgroundPosition="center"
            contentAlignmentProps={{ padding: "0px", paddingTop: '10rem' }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100 unselectable' style={{ display: 'flex', justifyContent: 'center' }}>Biblioteca</h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
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
                            <Image style={{  }} src={MagnifyingGlassImage} />
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
                <StyledCol style={{ maxWidth: '300px', padding: '2rem'}}>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                                    Livros
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </form>

                    <StyledNav className="justify-content-center" style={{ overflow: 'auto', maxHeight: '1000px', textAlign: 'center', margin: '20px' }}>
                        <NavItem>
                            <NewsNavLink>
                                Ocultistas
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Lanche do Guarda
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Brass Armor
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Old Backpack
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Wooden Staff
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Skull Ring
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Pesquisa de Seymour
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Entrega das Ferramentas
                            </NewsNavLink>
                        </NavItem>

                        <NavItem>
                            <NewsNavLink>
                                Dark Robe
                            </NewsNavLink>
                        </NavItem>
                    </StyledNav>
                </StyledCol>

                <StyledCol>
                    <StyledContainer style={{ padding: '2rem', paddingTop: '0' }} fluid>
                        <Row>
                            <BookDisplay />
                        </Row>
                    </StyledContainer>

                </StyledCol>
            </Row>
        </SectionBackdrop>
    </Container>
)

export default Content
