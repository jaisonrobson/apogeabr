import React from 'react'

import { Container, Row, Col, Overlay, GradientOverlay } from 'components'

const SectionBackdrop = ({ children, contentAlignmentProps, ...props }) => (
    <Row
        {...props}
    >
        <GradientOverlay width="100%" height="100%" top='0px' bottom='0px' left='0px' padding='0px' margin='0px'>
            <Overlay width="100%" height="100%" top='0px' bottom='0px' left='0px' padding='0px' margin='0px'>
                <Container fluid padding="35px" {...contentAlignmentProps}>
                    {children}
                </Container>
            </Overlay>
        </GradientOverlay>
    </Row>
)

export default SectionBackdrop