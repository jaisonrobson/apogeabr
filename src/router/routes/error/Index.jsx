import React from 'react'
import { isRouteErrorResponse, useRouteError } from "react-router"

import ErrorContentImage from 'images/layout/error/error_content.png'

import { Container, Row, SectionBackdrop, TitleH2, TitleH4 } from 'components'

const ErrorBoundary = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return (
            <Content>
                <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                    <TitleH2>{error.status} {error.statusText}</TitleH2>
                    <TitleH4>Envie essa mensagem para o administrador do website</TitleH4>
                    <p>{error.data}</p>
                </Row>
            </Content>
        )
    } else if (error instanceof Error) {
        return (
            <Content>
                <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                    <p>{error.message}</p>
                    <p>A pilha é:</p>
                    <pre>{JSON.stringify(error.stack)}</pre>
                </Row>
            </Content>
        )
    } else {
        return (
            <Content>
                <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                    <TitleH2>Erro anonimo</TitleH2>
                </Row>
            </Content>
        )
    }
}

export default ErrorBoundary

const Content = ({ children }) => (
    <Container style={{ minWidth: '100vw', minHeight: '100vh' }}>
        <SectionBackdrop
            position="absolute"
            width="100%"
            height="100%"
            gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
            backgroundImage={`url(${ErrorContentImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat"
            backgroundPosition="center"
            contentAlignmentProps={{ padding: '15rem' }}
        >
            <TitleH2>Aconteceu algum problema</TitleH2>

            <TitleH4>Envie essa mensagem para o administrador do website</TitleH4>

            <Container style={{ padding: '5rem' }} fluid>
                <Row className="text-gray-300">
                    {children}
                </Row>
            </Container>
        </SectionBackdrop>
    </Container>
)