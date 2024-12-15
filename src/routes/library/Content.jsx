import React from 'react'
import styled from 'styled-components'
import {
    Nav,
    NavItem,
} from 'reactstrap'

import LibraryTopImage from 'images/layout/library/library_top.webp'
import LibraryContentImage from 'images/layout/library/library_content.webp'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'
import NavLink from 'components/layout/NavLink'
import Dropdown from 'components/layout/Dropdown'

import BookDisplay from 'components/custom/BookDisplay'


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
        <StyledRow
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${LibraryTopImage})`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
                backgroundSize: 'contain, 30%',
                paddingTop: '10rem'
            }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100' style={{ display: 'flex', justifyContent: 'center' }}>Biblioteca</h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                        <input name="query" style={{ width: '50%' }}/>
                    </form>
                </Col>
            </Row>
        </StyledRow>

        <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${LibraryContentImage})`}}>
            <StyledCol style={{ maxWidth: '300px', paddingTop: '5rem', paddingBottom: '5rem' }}>
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

                <StyledNav bsStyle="pills" stacked className="justify-content-center" style={{ overflow: 'auto', maxHeight: '1000px', textAlign: 'center', margin: '20px' }}>
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
                <StyledContainer style={{ padding: '2rem' }} fluid>
                    <Row>
                        <BookDisplay />
                    </Row>
                </StyledContainer>

            </StyledCol>
        </StyledRow>
    </Container>
)

export default Content
