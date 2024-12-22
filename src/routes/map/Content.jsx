import React from 'react'
import styled from 'styled-components'
import {
    Nav,
    NavItem,
} from 'reactstrap'
import { CRS } from 'leaflet'

import {
    MapContainer,
    ImageOverlay
  } from 'react-leaflet'

import MapTopImage from 'images/layout/map/map_top.png'
import MapContentImage from 'images/layout/map/map_content.jpg'
import ApogeaMap from 'images/layout/map/apogeamap.png'
import ApogeaMapOcean from 'images/layout/map/apogeamapocean.png'

import { Container, Col, Row, NavLink, Dropdown } from 'components'

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
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${MapTopImage})`,
                backgroundRepeat: 'repeat-x, repeat',
                backgroundPosition: 'center, center',
                backgroundSize: 'contain, 35%',
                paddingTop: '10rem'
            }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100 unselectable' style={{ display: 'flex', justifyContent: 'center' }}>Mapa</h2>
                </Col>
            </Row>
        </StyledRow>

        <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${MapContentImage})`, backgroundPosition: "center, center" }}>
            <StyledCol style={{ maxWidth: '300px', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                </form>

                <StyledNav className="justify-content-center" style={{ overflow: 'auto', maxHeight: '1000px', textAlign: 'center', margin: '20px' }}>
                    <NavItem>
                        <NewsNavLink>
                            Basile
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Dorosam
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Vecan
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            Goblin Hills
                        </NewsNavLink>
                    </NavItem>

                    <NavItem>
                        <NewsNavLink>
                            The Caravan
                        </NewsNavLink>
                    </NavItem>
                </StyledNav>
            </StyledCol>

            <StyledCol>
                <StyledContainer style={{ padding: '2rem' }} fluid>
                    <Row>
                        <MapContainer
                            center={[500, 625]}
                            scrollWheelZoom={true}
                            style={{
                                width:'100%',
                                height: '900px',
                                backgroundImage: `url(${ApogeaMapOcean})`,
                                zIndex: 1
                            }}
                            bounds = {[[0,0], [1,1]]}
                            crs={CRS.Simple}
                            zoom={1}
                            minZoom={1}
                            maxZoom={3}
                            maxBounds={[[0, 0], [1000,1300]]}
                        >
                            <ImageOverlay url={ApogeaMap} bounds = {[[0,0], [1000,1300]]}/>
                        </MapContainer>
                    </Row>
                </StyledContainer>

            </StyledCol>
        </StyledRow>
    </Container>
)

export default Content
