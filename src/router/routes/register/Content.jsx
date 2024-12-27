import React from 'react'

import RegisterContentImage from 'images/layout/register/register_content.png'

import {
    StoneTabletBoard,
    Container,
    Col,
    Row,
    RegisterForm,
    ApogeaHoverNavLink,
    SectionBackdrop,
    TitleH2,
} from 'components'

const Content = () => (
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
                    to="/user/"
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

                            <RegisterForm />
                        </Container>
                    </StoneTabletBoard>
                </Col>
        </Row>
    </SectionBackdrop>
)

export default Content
