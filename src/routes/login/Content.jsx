import React from 'react'
import styled from 'styled-components'

import LoginContentImage from 'images/layout/login/login_content.png'

import { StoneTabletBoard, Container, Col, Row, LoginForm, ApogeaHoverNavLink } from 'components'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset
    width: 100vw;
    margin: 0;
`

const Content = () => (
    <Container
        style={{
            margin: 0,
            padding: 0,
            position: 'absolute',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${LoginContentImage})`,
            backgroundRepeat: 'repeat-x, repeat-x',
            backgroundPosition: 'center, 50% 35%',
            backgroundSize: 'contain, cover',
            height: '100%',
            width: '100%',
        }}
        fluid
    >
        <StyledRow
            style={{ flex: 0, paddingLeft: '25px' }}
        >
            <Col>
                <ApogeaHoverNavLink
                    to="/"
                    style={{
                        width: '150px',
                        display:'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{ fontFamily: 'arial black' }}>{`<-`}</div>-Voltar
                </ApogeaHoverNavLink>
            </Col>
        </StyledRow>

        <StyledRow
            style={{
                paddingLeft: '30%',
                paddingRight: '30%',
                paddingTop: '10%',
                flex: 1
            }}
        >
                <Col>
                    <StoneTabletBoard>
                        <div
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            className='unselectable'
                        >
                            <h2 className='text-black' style={{ fontFamily: 'Papyrus' }}>Acesso</h2>

                            <LoginForm />
                        </div>
                    </StoneTabletBoard>
                </Col>
        </StyledRow>
    </Container>
)

export default Content
