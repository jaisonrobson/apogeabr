import React, { useContext } from 'react'

import { Container, Row, Col, TitleH2, CardsDisplay } from 'components'

import { I18nContext } from 'contexts'

const NewsCardsDisplay = ({ payload }) => {
    const { formatDateTime } = useContext(I18nContext)

    const formattedPayload = payload?.map(news => ({
        id: news.id,
        image: news.image,
        caption: `${formatDateTime(news.created_at)} - ${news.created_by_name}`,
        title: news.news_post_translation?.title || ''
    })) || []

    return (
        <Container fluid>
            <Row>
                <Col>
                    <TitleH2 justifyContent="flex-start" light>Ultimos posts</TitleH2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CardsDisplay payload={formattedPayload} />
                </Col>
            </Row>
        </Container>
    )
}

export default NewsCardsDisplay
