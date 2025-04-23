import React from 'react'
import styled from 'styled-components'

import { Image, Container, Row, Col, Div } from 'components'

const StyledH4 = styled.h4`
    margin: 0;
    color: #FFFFFF;
`

const StyledP = styled.p`
    margin: 0;
    color: #FFFFFFA9;
`

const Wrapper = Div
const GradientOverlay = Div
const CaptionOverlay = Div

const Cover = ({ title, caption, image, width, height, onClick, ...props }) => (
    <Wrapper
        position="relative"
        boxShadow="0 12px 18px rgba(0,0,0,.28)"
        transition="transform .2s"
        onHover={{
            transform: "scale(1.1)",
            boxShadow: "0 10px 10px rgba(0,0,0,.28)",
        }}
        width={width}
        height={height}
        onClick={onClick}
        {...props}
    >
        <GradientOverlay
            position="absolute"
            zIndex="2"
            background="linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 35%, #000000 110%)"
            width={width}
            height={height}
            {...props}
        />

        <CaptionOverlay
            position="absolute"
            zIndex="3"
            width={width}
            height={height}
            onHover={{
                backgroundColor: "#ffffff15",
            }}
            {...props}
        >
            <Container
                padding="0"
                width="100%"
                height="100%"
                display="flex"
                alignItems="flex-end"
            >
                <Row margin="0">
                    <Col
                        padding="0"
                        marginLeft="1rem"
                        marginBottom="1rem"
                        width={`calc(${width} - 1rem)`}
                        overflowWrap="break-word"
                    >
                        <StyledH4 className="unselectable">{title}</StyledH4>
                        <StyledP className="unselectable">{caption}</StyledP>
                    </Col>
                </Row>
            </Container>
        </CaptionOverlay>

        <Image
            src={image}
            width={width}
            height={height}
            objectFit="cover"
            zIndex="1"
            {...props}
        />
    </Wrapper>
)

export default Cover
