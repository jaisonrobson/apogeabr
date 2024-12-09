import React, { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import WoodImage from 'images/layout/oak_planks_1.png'
import LibraryImage from 'images/layout/library1.webp'
import LibraryImage2 from 'images/layout/library2.webp'
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
            <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${LibraryImage})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'center', backgroundSize: 'contain', paddingTop: '35rem' }}>
                <h2 className='text-gray-100'>Biblioteca</h2>
            </StyledRow>

            <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${LibraryImage2})`, paddingTop: '2rem' }}>
                <StyledCol>
                    <StyledContainer style={{ padding: '2rem' }} fluid>
                        <Row>
                            <BookDisplay />
                        </Row>
                    </StyledContainer>

                </StyledCol>
            </StyledRow>
        </Container>
    )
}

export default Content
