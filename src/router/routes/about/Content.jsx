import React from 'react'

import AboutUsTopImage from 'images/layout/aboutus/about_us_top.png'
import AboutUsContentImage from 'images/layout/aboutus/about_us_content.png'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

import { Container, Row, SectionBackdrop, TitleH2 } from 'components'

const Content = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${AboutUsTopImage})`}
            backgroundSize="50%"
            backgroundRepeat="repeat-x"
            backgroundPosition="left"
            contentAlignmentProps={{ paddingTop: '10rem' }}
        >
            <TitleH2 light>Sobre nós</TitleH2>
        </SectionBackdrop>

        <SectionBackdrop
            gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
            backgroundImage={`url(${AboutUsContentImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ paddingTop: '2rem' }}
        >
            <Container style={{ padding: '5rem' }} fluid>
                <Row className="text-gray-300">
                    <LoremIpsumParagraphs />
                </Row>
            </Container>
        </SectionBackdrop>
    </Container>
)

export default Content
