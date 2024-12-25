import React, { useContext } from 'react'
import _ from 'lodash'

import StatementImage from 'images/layout/landing/statement.png'
import PresentationImage from 'images/layout/landing/presentation.png'

import { Container, Col, Row, WeeklyScreenshotCarousel, CardsDisplay, GoldBoard, SectionBackdrop } from 'components'

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

            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h2 className="text-gray-100">Ultimos posts</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <CardsDisplay payload={cardsPayload} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <SectionBackdrop
                backgroundImage={`url(${PresentationImage})`}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                backgroundPosition="center"
            >
                <Row>
                    <Col>
                        <h2 className='text-gray-100 unselectable' style={{ display: 'flex', justifyContent: 'center' }}>Apresentação</h2>                        
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <GoldBoard contentClassName="text-gray-300" />                        
                    </Col>
                </Row>
            </SectionBackdrop>

            <SectionBackdrop
                backgroundImage={`url(${StatementImage})`}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                backgroundPosition="center"
            >
                <Row>
                    <Col>
                        <h2 className='text-gray-100 unselectable' style={{ display: 'flex', justifyContent: 'center' }}>Comunicado</h2>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <GoldBoard />
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
