import React, { useContext } from 'react'
import _ from 'lodash'

import NewsContentImage from 'images/layout/news/news_content.png'
import NewsTopImage from 'images/layout/news/news_top.png'

import {
    Container,
    Col,
    Row,
    NavLink,
    PaperParchmentBoard,
    WoodParchmentBoard,
    SectionBackdrop,
    TitleH2,
    NewsCardsDisplay,
    Nav,
    DrawerNavItem,
} from 'components'

import { ReducerContext } from 'contexts'

import { randomSliceIntoNGivenValues } from 'util/array'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

const NewsNavLink = (props) => (
    <NavLink {...props} color="#6c6456" textShadow="1px 1px #a99e89" hoverColor="white" hoverTextShadow="1px 1px 3px #000000" fontFamily="Celtic Garamond the 2nd" />
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
                <NewsCardsDisplay payload={cardsPayload} />
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
                            <TitleH2 className="text-black" textAlign="center" paddingBottom="1rem" fontFamily="Papyrus">Notícia</TitleH2>

                            <LoremIpsumParagraphs />
                        </PaperParchmentBoard>
                    </Col>

                    <Col style={{ maxWidth: '400px' }}>
                        <WoodParchmentBoard>
                            <Nav
                                display="flex"
                                flexDirection="column"
                                className="justify-content-center"
                                textAlign="center"                                
                                fontSize='18px'
                                fontWeight='1000'
                            >
                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 1
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 2
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 3
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 4
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <hr style={{ width: '100%', borderWidth: '3px' }}/>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 1
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 2
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 3
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 4
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <hr style={{ width: '100%', borderWidth: '3px' }}/>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 1
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 2
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 3
                                    </NewsNavLink>
                                </DrawerNavItem>

                                <DrawerNavItem>
                                    <NewsNavLink>
                                        Noticia 4
                                    </NewsNavLink>
                                </DrawerNavItem>                                    
                            </Nav>
                        </WoodParchmentBoard>
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
