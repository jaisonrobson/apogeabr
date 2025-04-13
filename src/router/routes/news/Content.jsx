import React, { useContext } from 'react'
import _ from 'lodash'
import { useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

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
    ElasticSearchDropdown,
} from 'components'

const NewsNavLink = (props) => (
    <NavLink {...props} color="#6c6456" textShadow="1px 1px #a99e89" hoverColor="white" hoverTextShadow="1px 1px 3px #000000" fontFamily="Celtic Garamond the 2nd" />
)

const Content = () => {
    const { news: newsPayload, specificNews: specificNewsPayload } = useRouteLoaderData("news")
    const shownNews = specificNewsPayload || _.first(newsPayload)

    const onSelectSearchedNews = (selectedId) => {
        window.location.assign(
            `${ROUTES.NEWS.path.slice(0, -1)}?id=${selectedId}`
        )
    }

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
                <NewsCardsDisplay payload={newsPayload} />
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
                            <TitleH2 className="text-black" textAlign="center" paddingBottom="1rem" fontFamily="Papyrus">{shownNews?.news_post_translation?.title || "Notícia não localizada"}</TitleH2>

                            <Row>
                                <Col>
                                    {shownNews?.news_post_translation?.content || "Não foi possível carregar o conteúdo da notícia."}
                                </Col>
                            </Row>
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
                                    <ElasticSearchDropdown
                                        searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/news_posts/search`}
                                        searchPayloadIdPath={["id"]}
                                        searchPayloadNamePath={["news_post_translation", "title"]}
                                        searchPayloadImagePath ={["image"]}
                                        fieldNamingLenght={15}
                                        onChange={onSelectSearchedNews}
                                        togglerProperties={{
                                            padding: "0px 15px",
                                        }}
                                    />
                                </DrawerNavItem>

                                <hr style={{ width: '100%', borderWidth: '3px' }}/>

                                {newsPayload.map((news) => (
                                    <DrawerNavItem key={news.id}>
                                        <NewsNavLink to={`${ROUTES.NEWS.path.slice(0, -1)}?id=${news.id}`}>
                                            {news.news_post_translation?.title}
                                        </NewsNavLink>
                                    </DrawerNavItem>
                                ))}
                            </Nav>
                        </WoodParchmentBoard>
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
