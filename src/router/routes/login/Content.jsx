import React from 'react'

import LoginContentImage from 'images/layout/login/login_content.png'

import ROUTES from 'router/routes'

import {
    StoneTabletBoard,
    Container,
    Col,
    Row,
    UserLoginForm,
    ApogeaHoverNavLink,
    SectionBackdrop,
    TitleH2,
} from 'components'

const Content = () => (
    <SectionBackdrop
        backgroundImage={`url(${LoginContentImage})`}
        backgroundSize="cover"
        backgroundRepeat="repeat-x"
        backgroundPosition="50% 50%"
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
                    to={ROUTES.HOME.path}
                    width="150px"
                    display="flex"
                    justifyContent="center"
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
                            <TitleH2 className='text-black' fontFamily='Papyrus'>Acesso</TitleH2>

                            <UserLoginForm />
                        </Container>
                    </StoneTabletBoard>
                </Col>
        </Row>
    </SectionBackdrop>
)

export default Content
