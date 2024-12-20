import React from 'react'
import styled from 'styled-components'
import {
    Nav,
} from 'reactstrap'

import HelpUsTopImage from 'images/layout/helpus/help_us_top.png'
import HelpUsContentImage from 'images/layout/helpus/help_us_content.png'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const StyledContainer = styled((props) => <Container {...props} />)`
    margin-top: 2rem;
`

const Content = () => (
    <Container fluid>
        <StyledRow
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${HelpUsTopImage})`,
                backgroundRepeat: 'repeat-x, repeat-x',
                backgroundPosition: 'center, 50% 35%',
                backgroundSize: 'contain, 45%',
                paddingTop: '10rem'
            }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100 unselectable' style={{ display: 'flex', justifyContent: 'center' }}>Ajude nos</h2>
                </Col>
            </Row>
        </StyledRow>

        <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${HelpUsContentImage})`, backgroundPosition: "center, center" }}>
            <StyledCol>
                <StyledContainer style={{ padding: '5rem' }} fluid>
                    <Row className="text-gray-400">
                        <LoremIpsumParagraphs />
                    </Row>
                </StyledContainer>

            </StyledCol>
        </StyledRow>
    </Container>
)

export default Content
