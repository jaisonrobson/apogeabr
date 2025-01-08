import React from 'react'
import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'

import RegisterContentImage from 'images/layout/register/register_content.png'

import ROUTES from 'router/routes'

import {
    StoneTabletBoard,
    Container,
    Col,
    Row,
    RegisterForm,
    ApogeaHoverNavLink,
    SectionBackdrop,
    TitleH2,
    TitleH4,
    TimedRedirect,
} from 'components'

const Content = () => {
    const [ searchParams ] = useSearchParams()

    const backendResponse = JSON.parse(searchParams.get("success") || "{}")

    return (
        <SectionBackdrop
            backgroundImage={`url(${RegisterContentImage})`}
            backgroundSize="cover"
            backgroundRepeat="repeat-x"
            backgroundPosition="50% 70%"
            margin="0px"
            padding="0px"
            position="absolute"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="stretch"
            height="100%"
            width="100%"
            contentAlignmentProps={{ paddingTop: '2rem' }}
        >
            <Row>
                <Col>
                    <ApogeaHoverNavLink
                        to={ROUTES.USER_LOGIN.path}
                        width="150px"
                        display="flex"
                        justifyContent="center"
                        activeColor="white"
                    >
                        <div style={{ fontFamily: 'arial black' }}>{`<-`}</div>-Voltar
                    </ApogeaHoverNavLink>
                </Col>
            </Row>

            <Row
                display="flex"
                paddingLeft="30%"
                paddingRight="30%"
                paddingTop="10%"
            >
                    <Col>
                        <StoneTabletBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <TitleH2 className='text-black' fontFamily='Papyrus'>Registro</TitleH2>

                                {_.isEmpty(backendResponse)
                                    ? <RegisterForm />
                                    : (
                                        <Row paddingTop="25px" borderTop="2px solid gray">
                                            <TitleH4 className="text-black">{backendResponse?.message}</TitleH4>
                                            <TimedRedirect redirectTo={ROUTES.USER_LOGIN.path} />
                                        </Row>
                                    )
                                }
                            </Container>
                        </StoneTabletBoard>
                    </Col>
            </Row>
        </SectionBackdrop>
    )
}

export default Content
