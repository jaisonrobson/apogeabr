import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import BottomImage from 'images/layout/generic/bottom.png'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

import BottomRibbon from 'components/custom/BottomRibbon'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const Bottom = () => {
    return (
        <Container fluid>
            <StyledRow>
                <StyledCol>
                    <BottomRibbon payload={{ imageSrc:BottomImage }} />
                </StyledCol>
            </StyledRow>
        </Container>
    )
}

export default Bottom