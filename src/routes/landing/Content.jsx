import React, { useContext } from 'react'
import _ from 'lodash'

import StatementImage from 'images/layout/landing/statement.png'
import PresentationImage from 'images/layout/landing/presentation.png'

import {
    Container,
    Col,
    Row,
    WeeklyScreenshotCarousel,
    GoldBoard,
    SectionBackdrop,
    TitleH2,
    NewsCardsDisplay,
} from 'components'

import { ReducerContext } from 'contexts'

import { randomSliceIntoNGivenValues } from 'util/array'

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
            <Row>
                <Col padding="0px">
                    <WeeklyScreenshotCarousel payload={carouselPayload} />
                </Col>
            </Row>

            <NewsCardsDisplay payload={cardsPayload} />
            
            <SectionBackdrop
                gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
                backgroundImage={`url(${PresentationImage})`}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                backgroundPosition="center"
            >
                <Row>
                    <Col>
                        <TitleH2>Apresentação</TitleH2>                        
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <GoldBoard contentClassName="text-gray-300" />                        
                    </Col>
                </Row>
            </SectionBackdrop>

            <SectionBackdrop
                gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
                backgroundImage={`url(${StatementImage})`}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                backgroundPosition="center"
            >
                <Row>
                    <Col>
                        <TitleH2>Comunicado</TitleH2>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <GoldBoard contentClassName="text-gray-300" />
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
