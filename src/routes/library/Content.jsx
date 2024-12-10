import React from 'react'
import styled from 'styled-components'
import {
    Nav,
    NavItem,
} from 'reactstrap'

import LibraryImage from 'images/layout/library1.webp'
import LibraryImage2 from 'images/layout/library2.webp'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'
import NavLink from 'components/layout/NavLink'

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
    <NavLink {...props} color="#6c6456" textShadow="1px 1px #a99e89" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => (
    <Container fluid>
        <StyledRow
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${LibraryImage})`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                paddingTop: '20rem'
            }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100' style={{ display: 'flex', justifyContent: 'center' }}>Biblioteca</h2>
                </Col>                
            </Row>            
        </StyledRow>

        <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${LibraryImage2})`}}>
            <StyledCol style={{ maxWidth: '300px', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <StyledNav bsStyle="pills" stacked className="justify-content-center" style={{ overflow: 'auto', maxHeight: '1000px' }}>
                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
                        </NewsNavLink>
                    </NavItem>

                    <hr style={{ width: '100%', borderWidth: '3px' }}/>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
                        </NewsNavLink>
                    </NavItem>

                    <hr style={{ width: '100%', borderWidth: '3px' }}/>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
                        </NewsNavLink>
                    </NavItem>

                    <hr style={{ width: '100%', borderWidth: '3px' }}/>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
                        </NewsNavLink>
                    </NavItem>

                    <hr style={{ width: '100%', borderWidth: '3px' }}/>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
                        </NewsNavLink>
                    </NavItem>

                    <hr style={{ width: '100%', borderWidth: '3px' }}/>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 1
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 2
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 3
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Noticia 4
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
