import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import BottomImage from 'images/layout/generic/bottom.png'

import { Container, SectionBackdrop, Row } from 'components'

const Bottom = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${BottomImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            height="35rem"
            contentAlignmentProps={{
                height: '100%',
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-end"
            }}
        >
            <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Row>
                    <h2 className="text-apogea-600 unselectable">@ApogeaBR</h2>
                </Row>
            </Container>
        </SectionBackdrop>
    </Container>
)

export default Bottom