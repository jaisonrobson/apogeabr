import React, { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

import MoviesCarousel from 'components/custom/MoviesCarousel'
import CardsDisplay from 'components/custom/CardsDisplay'
import PostersDisplay from 'components/custom/PostersDisplay'
import MovieRibbon from 'components/custom/MovieRibbon'

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
        ribbonPayload,
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
                    <MoviesCarousel payload={carouselPayload} />
                </StyledCol>
            </Row>

            <StyledRow>
                <StyledCol>
                    <StyledContainer fluid>
                        <Row>
                            <Col>
                                <h2 className="text-gray-100">Releases</h2>
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

            <StyledRow className="bg-gray-700">
                <StyledCol>
                    <StyledContainer fluid>
                        <Row>
                            <Col>
                                <h2 className="text-gray-100">Featured</h2>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <PostersDisplay payload={postersPayload} />
                            </Col>
                        </Row>
                    </StyledContainer>
                </StyledCol>
            </StyledRow>

            <StyledRow>
                <StyledCol>
                    <MovieRibbon payload={_.head(ribbonPayload)} />
                </StyledCol>
            </StyledRow>
        </Container>
    )
}

export default Content
