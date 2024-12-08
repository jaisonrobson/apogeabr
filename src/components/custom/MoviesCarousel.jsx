import React from 'react'
import styled from 'styled-components'

import Col from 'components/layout/Col'
import Container from 'components/layout/Container'
import Row from 'components/layout/Row'
import Carousel from 'components/layout/Carousel'
import Button from 'components/layout/Button'

const initialPayload = [
    {
        imageSrc: null,
        title: 'none',
        synopsis: 'none',
        genre: 'none',
        year: 0,
        duration: 0,
    }
]

const StyledH1 = styled.h1`
    color: #ffffff;
`

const StyledP = styled.p`
    font-family: 'Roboto',sans-serif;
    font-size: 12px;
    line-height: 1.5em;
    color: #FFFFFFA8;
    text-shadow: 1px 1px 2px #57575770;
`

const MoviesCarousel = ({ payload = initialPayload }) => (
    <Carousel
        payload={payload}
        imageParameter="imageSrc"
        caption={({ payload, active }) => (
            <Container>
                <Row>
                    <Col>
                        <StyledH1 className="unselectable">
                            {payload[active].title}
                        </StyledH1>
                    </Col>
                </Row>

                <Row marginTop="1rem">
                    <Col>
                        <div className="text-gray-400 unselectable" style={{ display: 'inline', marginRight: '2rem', paddingRight: '2rem', borderRight: '1px solid' }}>{payload[active].year}</div>
                        <div className="text-gray-400 unselectable" style={{ display: 'inline', marginRight: '2rem', paddingRight: '2rem', borderRight: '1px solid' }}>{payload[active].duration} min</div>
                        <div className="text-gray-400 unselectable" style={{ display: 'inline' }}>{payload[active].genre}</div>
                    </Col>
                </Row>

                <Row marginTop="1rem">
                    <Col>
                        <StyledP className="unselectable">
                            {payload[active].synopsis}
                        </StyledP>
                    </Col>
                </Row>

                <Row marginTop="1rem">
                    <Col>
                        <Button>Watch</Button>
                    </Col>
                </Row>
            </Container>
        )}
    />
)

export default MoviesCarousel
