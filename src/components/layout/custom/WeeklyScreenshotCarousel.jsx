import React from 'react'
import styled from 'styled-components'

import { Container, Row, Col, Carousel } from 'components'

const initialPayload = [
    {
        imageSrc: null,
        title: 'none',
        content: 'none',
        genre: 'none',
        year: 0,
        duration: 0,
    }
]

const StyledContainer = styled(Container)`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: inherit;
    width: inherit;
    flex-direction: column;
    padding: 3rem;
`

const WeeklyScreenshotCarousel = ({ payload = initialPayload }) => (
    <Carousel
        payload={payload}
        imageParameter="imageSrc"
        caption={({ payload, active }) => (
            <StyledContainer>
                <Row>
                    <Col>
                        <h1 className="text-apogea-400 unselectable">Screenshot da Semana</h1>
                    </Col>
                </Row>
            </StyledContainer>
        )}
    />
)

export default WeeklyScreenshotCarousel
