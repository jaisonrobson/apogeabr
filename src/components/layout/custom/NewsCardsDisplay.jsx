import React from 'react'

import { Container, Row, Col, TitleH2, CardsDisplay } from 'components'

const NewsCardsDisplay = ({ payload }) => (
    <Container fluid>
        <Row>
            <Col>
                <TitleH2 justifyContent="flex-start">Ultimos posts</TitleH2>
            </Col>
        </Row>

        <Row>
            <Col>
                <CardsDisplay payload={payload} />
            </Col>
        </Row>
    </Container>
)

export default NewsCardsDisplay
