import React from 'react'

import ProfileContentImage from 'images/layout/profile/profile_content.png'

import {
    StoneTabletBoard,
    Container,
    Col,
    Row,
    LoginForm,
    ApogeaHoverNavLink,
    SectionBackdrop,
    TitleH2,
} from 'components'

const Content = () => (
    <SectionBackdrop
        backgroundImage={`url(${ProfileContentImage})`}
        gradientBackground="transparent"
        backgroundSize="cover"
        backgroundPosition="center"
        margin="0px"
        padding="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        flexGrow="1"
        contentAlignmentProps={{ paddingTop: '2rem' }}
    >
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
                            <TitleH2 className='text-black' fontFamily='Papyrus'>Perfil</TitleH2>
                        </Container>
                    </StoneTabletBoard>
                </Col>
        </Row>
    </SectionBackdrop>
)

export default Content
