import React from 'react'

import HelpUsTopImage from 'images/layout/helpus/help_us_top.png'
import HelpUsContentImage from 'images/layout/helpus/help_us_content.png'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

import { Container, Row, SectionBackdrop, TitleH2 } from 'components'

const Content = () => (
    <Container fluid>
        <SectionBackdrop
            backgroundImage={`url(${HelpUsTopImage})`}
            backgroundSize="45%"
            backgroundRepeat="repeat-x"
            backgroundPosition="50% 35%"
            contentAlignmentProps={{ paddingTop: '10rem' }}
        >
            <TitleH2 light>Ajude nos</TitleH2>
        </SectionBackdrop>

        <SectionBackdrop
            gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
            backgroundImage={`url(${HelpUsContentImage})`}
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
