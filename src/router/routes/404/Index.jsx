import React from 'react'

import NotFoundImage from 'images/layout/404/404_content.png'

import { Container, SectionBackdrop, TitleH2, TitleH4 } from 'components'

const NotFound = () => (
    <Container style={{ minWidth: '100vw', minHeight: '100vh' }}>
        <SectionBackdrop
            position="absolute"
            width="100%"
            height="100%"
            gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
            backgroundImage={`url(${NotFoundImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%' }}
        >
            <TitleH2 className="text-white">404 - Página não encontrada</TitleH2>

            <TitleH4 marginTop="2rem">Verifique a URL e tente novamente</TitleH4>
        </SectionBackdrop>
    </Container>
)

export default NotFound
