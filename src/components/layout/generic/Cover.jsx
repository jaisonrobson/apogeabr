import React from 'react'
import styled from 'styled-components'

import { Image, Container, Row, Col } from 'components'

const Wrapper = styled.div`
    position: relative;
    box-shadow: 0 12px 18px rgba(0,0,0,.28);
    transition: transform .2s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 10px 10px rgba(0,0,0,.28);
    }
`

const CaptionOverlay = styled(({ width, height, ...props }) => <div {...props} />)`
    position: absolute;
    z-index: 3;
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}

    &:hover {
        background-color: #ffffff15;
    }
`

const GradientOverlay = styled(({ width, height, ...props }) => <div {...props} />)`
    position: absolute;
    z-index: 2;
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}
    background: linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 35%, #000000 110%);
`

const StyledH4 = styled.h4`
    margin: 0;
    color: #FFFFFF;
`

const StyledP = styled.p`
    margin: 0;
    color: #FFFFFFA9;
`

const Cover = ({ title, caption, image, width, height, onClick }) => (
    <Wrapper onClick={onClick} style={{ width: width, height: height }}>
        <GradientOverlay width={width} height={height} />

        <CaptionOverlay width={width} height={height}>
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
        />
    </Wrapper>
)

export default Cover
