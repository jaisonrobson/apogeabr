import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import * as z from 'zod'
import {
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'

import LoginContentImage from 'images/layout/login/login_content.png'

import { StoneTabletBoard, Container, Col, Row, Input, Form } from 'components'

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
                    <Col>
                        <StoneTabletBoard>
                            <div
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                                className='unselectable'
                            >
                                <h2 className='text-black' style={{ fontFamily: 'Papyrus' }}>Acesso</h2>

                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row style={{ margin: '15px 0px' }}>
                                        <Col>
                                            Usuario:
                                        </Col>

                                        <Col>
                                            <Input {...register("login")} />
                                        </Col>
                                    </Row>
                                    
                                    <Row style={{ margin: '15px 0px' }}>
                                        <Col>
                                            Senha:
                                        </Col>

                                        <Col>
                                            <Input {...register("password")} />
                                        </Col>
                                    </Row>
                                    
                                    <Input
                                        value='Entrar'
                                        type="submit"
                                        marginTop='25px'
                                        backgroundColor='#00000010'
                                        border='2px solid gray'
                                        onHover={{
                                            animation: {
                                                property: 'loginButtonAnimation 0.5s linear 0s infinite alternate',
                                                corpse: `@keyframes loginButtonAnimation {
                                                    0%  {transform: scale3d(1,1,1);}
                                                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                                }`
                                            }
                                        }}                                        
                                    />
                                </Form>
                            </div>
                        </StoneTabletBoard>
                    </Col>
            </StyledRow>
        </Container>
    )
}

export default Content
