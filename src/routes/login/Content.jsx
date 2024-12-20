import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import {
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'

import LoginContentImage from 'images/layout/login/login_content.png'

import WoodParchmentBoard from 'components/custom/WoodParchmentBoard'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset
    width: 100vw;
    margin: 0;
`

const Content = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)

    return (
        <Container
            style={{
                margin: 0,
                padding: 0,
                position: 'absolute',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${LoginContentImage})`,
                backgroundRepeat: 'repeat-x, repeat-x',
                backgroundPosition: 'center, 50% 35%',
                backgroundSize: 'contain, 50%',
                height: '100%',
                width: '100%',
            }}
            fluid
        >
            <StyledRow
                style={{ flex: 0, paddingLeft: '25px' }}
            >
                <Col>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                href="/"
                                style={{
                                    width: '150px',
                                    display:'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                {`<-`} Voltar
                            </NavLink>
                        </NavItem>
                    </Nav>
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
                    <Col
                        // style={{ backgroundColor: 'red' }}
                    >
                        <WoodParchmentBoard>
                            <div
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <h2 className='text-black' style={{ fontFamily: 'Papyrus' }}>Acesso</h2>

                                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Retro Computer' }}>
                                    <Row>
                                        <Col>
                                            Usuario:
                                        </Col>

                                        <Col>
                                            <input {...register("login")} />
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col>
                                            Senha:
                                        </Col>

                                        <Col>
                                            <input {...register("password")} />
                                        </Col>
                                    </Row>
                                    
                                    <input style={{ marginTop: '25px' }} value='Entrar' type="submit" />
                                </form>
                            </div>
                        </WoodParchmentBoard>
                    </Col>
            </StyledRow>
        </Container>
    )
}

export default Content
