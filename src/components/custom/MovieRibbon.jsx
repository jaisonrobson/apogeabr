import React from 'react'
import styled from 'styled-components'

import Container from 'components/layout/Container'
import Row from 'components/layout/Row'
import Col from 'components/layout/Col'
import Ribbon from 'components/layout/Ribbon'

const StyledContainer = styled(Container)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: inherit;
    width: inherit;
    flex-direction: column;
`

const initialPayload = {
    title: 'none',
    year: 0,
    duration: 0,
    genre: 'none',
    synopsis: 'none',
    imageSrc: null,
}

const MovieRibbon = ({ payload = initialPayload }) => {
    return (
        <Ribbon payload={payload}>
            {({ title, year, duration, genre, synopsis }) => (
                <StyledContainer>
                    <Row>
                        <Col>
                            <h2 className="text-gray-100 unselectable">{title}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-gray-400 unselectable" style={{ display: 'inline', marginRight: '2rem', paddingRight: '2rem', borderRight: '1px solid' }}>{year}</div>
                            <div className="text-gray-400 unselectable" style={{ display: 'inline', marginRight: '2rem', paddingRight: '2rem', borderRight: '1px solid' }}>{duration} min</div>
                            <div className="text-gray-400 unselectable" style={{ display: 'inline' }}>{genre}</div>
                        </Col>
                    </Row>
                    <Row marginTop="1rem">
                        <Col>
                            <p className="text-gray-500 unselectable" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 5px #000' }}>
                                {synopsis}
                            </p>
                        </Col>
                    </Row>
                </StyledContainer>
            )}
        </Ribbon>
    )
}

export default MovieRibbon
