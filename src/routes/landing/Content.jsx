import React, { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import WoodImage from 'images/layout/oak_planks_1.png'
import ComunicadosImage from 'images/layout/comunicados.png'
import ApresentacaoImage from 'images/layout/apresentacao.png'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

import WeeklyScreenshotCarousel from 'components/custom/WeeklyScreenshotCarousel'
import CardsDisplay from 'components/custom/CardsDisplay'
import BookDisplay from 'components/custom/BookDisplay'
import GoldBoard from 'components/custom/GoldBoard'

import { ReducerContext } from 'contexts/withReducerContext'

import { randomSliceIntoNGivenValues } from 'util/array'


const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const StyledContainer = styled((props) => <Container {...props} />)`
    margin-top: 2rem;
`

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
                <StyledCol>
                    <WeeklyScreenshotCarousel payload={carouselPayload} />
                </StyledCol>
            </Row>

            <StyledRow>
                <StyledCol>
                    <StyledContainer fluid>
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
                    </StyledContainer>
                </StyledCol>
            </StyledRow>

            <StyledRow className="bg-black" style={{ backgroundImage: `linear-gradient(to bottom, transparent, #6f6f6f), url(${ApresentacaoImage})`, backgroundSize: '100%' , backgroundRepeat: 'no-repeat', backgroundPosition: 'top' }}>
                <StyledCol>
                    <StyledContainer
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            height: 'inherit',
                            width: 'inherit',
                            flexDirection: 'column'
                        }}
                    >
                        <Row>
                            <Col>
                                <h2 className="text-gray-100">Apresentação</h2>
                            </Col>
                        </Row>
                    </StyledContainer>

                    <StyledContainer style={{ padding: '2rem' }} fluid>
                        <GoldBoard contentClassName="text-gray-300" />
                    </StyledContainer>
                </StyledCol>
            </StyledRow>

            <StyledRow className="bg-gray-700" style={{ backgroundImage: `linear-gradient(to bottom, transparent, #000000), url(${ComunicadosImage})`, backgroundSize: '100%' , backgroundRepeat: 'no-repeat', backgroundPosition: 'top' }}>
                <StyledCol>
                    <StyledContainer
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            height: 'inherit',
                            width: 'inherit',
                            flexDirection: 'column'
                        }}
                    >
                        <Row>
                            <Col>
                                <h2 className="text-gray-100">Comunicado</h2>
                            </Col>
                        </Row>
                    </StyledContainer>

                    <StyledContainer style={{ padding: '2rem' }} fluid>
                        <GoldBoard />
                    </StyledContainer>
                </StyledCol>
            </StyledRow>
        </Container>
    )
}

export default Content
