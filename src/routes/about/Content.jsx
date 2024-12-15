import React, { useState } from 'react'
import styled from 'styled-components'
import {
    Nav,
    NavItem,
} from 'reactstrap'

import AboutUsTop from 'images/layout/aboutus/about_us_top.png'
import AboutUsContent from 'images/layout/aboutus/about_us_content.png'

import GoldBoard from 'components/custom/GoldBoard'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'
import NavLink from 'components/layout/NavLink'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const StyledContainer = styled((props) => <Container {...props} />)`
    margin-top: 2rem;
`

const StyledNav = styled((props) => <Nav {...props} />)`
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`

const Content = () => (
    <Container fluid>
        <StyledRow
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${AboutUsTop})`,
                backgroundRepeat: 'repeat-x, repeat-x',
                backgroundPosition: 'center, left',
                backgroundSize: 'contain, 50%',
                paddingTop: '10rem'
            }}
        >
            <Row>
                <Col>
                    <h2 className='text-gray-100' style={{ display: 'flex', justifyContent: 'center' }}>Sobre nós</h2>
                </Col>
            </Row>
        </StyledRow>

        <StyledRow style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${AboutUsContent})`, backgroundPosition: "center, center" }}>
            <StyledCol>
                <StyledContainer style={{ padding: '2rem' }} fluid>
                    <Row>
                        <GoldBoard className="text-gray-900" />
                    </Row>
                </StyledContainer>

            </StyledCol>
        </StyledRow>
    </Container>
)

export default Content
