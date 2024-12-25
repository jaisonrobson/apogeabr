import React, { useContext } from 'react'
import _ from 'lodash'
import {
    Nav,
    NavItem,
} from 'reactstrap'

import NewsContentImage from 'images/layout/news/news_content.png'
import NewsTopImage from 'images/layout/news/news_top.png'

import { Container, Col, Row, NavLink, CardsDisplay, PaperParchmentBoard, WoodParchmentBoard, SectionBackdrop } from 'components'

import { ReducerContext } from 'contexts'

import { randomSliceIntoNGivenValues } from 'util/array'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

const NewsNavLink = (props) => (
    <NavLink {...props} color="#6c6456" textShadow="1px 1px #a99e89" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => {
    const { movies } = useContext(ReducerContext)

    const [
        carouselPayload,
        cardsPayload,
        postersPayload,
    ] = randomSliceIntoNGivenValues(
        movies,
        [
            3,
            _.floor((movies.length - 4) / 2),
            _.ceil((movies.length - 4) / 2),
            1,
        ],
    )

    return (
        <Container fluid>
            <SectionBackdrop
                backgroundImage={`url(${NewsTopImage})`}
                backgroundSize="60%"
                backgroundRepeat="repeat-x"
                backgroundPosition="center"
                contentAlignmentProps={{
                    padding: "0px",
                    paddingTop: "8rem",
                }}
            >
                <Col>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h2 className="text-gray-100 unselectable">Ultimos posts</h2>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <CardsDisplay payload={cardsPayload} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </SectionBackdrop>

            <SectionBackdrop
                backgroundImage={`url(${NewsContentImage})`}
                backgroundSize="contain"
                backgroundRepeat="repeat"
                backgroundPosition="top"
                contentAlignmentProps={{ fontFamily: 'Papyrus', marginTop: '2rem' }}
            >
                <Row>
                    <Col>
                        <PaperParchmentBoard style={{ fontSize: '18px', fontWeight: '100' }}>
                            <h2 style={{ textAlign: 'center', paddingBottom: '1rem', fontFamily: 'Papyrus' }} className="text-black">Notícia</h2>

                            <LoremIpsumParagraphs />
                        </PaperParchmentBoard>
                    </Col>

                    <Col style={{ maxWidth: '400px' }}>
                        <WoodParchmentBoard>
                            <Nav className="justify-content-center" style={{ paddingLeft: '25px', fontSize: '18px', fontWeight: '1000' }}>
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

                                <hr style={{ width: '100%', borderWidth: '3px', marginLeft: '-25px' }}/>

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

                                <hr style={{ width: '100%', borderWidth: '3px', marginLeft: '-25px' }}/>

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
                            </Nav>
                        </WoodParchmentBoard>
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
