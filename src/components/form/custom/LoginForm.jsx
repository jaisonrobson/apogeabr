import React, { useContext } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Form, Row, Col, Input, FormattedInput, ApogeaHoverNavLink } from 'components'

import { UserContext } from 'contexts'

const StyledRow = styled((props) => <Row {...props} />)`
    margin: 10px 0px;
`

const loginValidationSchema = z.object({
    login: z.string()
        .min(8, { message: 'Necessário ao menos 8 caracteres.' })
        .max(15, { message: 'Máximo de 15 caracteres atingido.' }),        
    password: z.string()
    .min(8, { message: 'Necessário ao menos 8 caracteres.' })
    .max(15, { message: 'Máximo de 15 caracteres atingido.' })
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        {
            message: `
            <p>A senha deve incluir: </p>
            <ul>
                <li>Pelo menos 8 caracteres</li>
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
                <li>Um caractere especial</li>
            </ul>
            `
        }
    ),
})

const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginValidationSchema) })
    const { login } = useContext(UserContext)

    const onSubmit = (data) => {
        login({ id: 666 })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
            <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>

            <StyledRow>
                <Col style={{ textAlign: 'center' }}>
                    {`Não possui uma conta? `}
                    <ApogeaHoverNavLink fontFamily="Retro Computer" to="/register/">Registre-se</ApogeaHoverNavLink>
                </Col>
            </StyledRow>
            
            <Input
                value='Entrar'
                type="submit"
                marginTop='15px'
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
    )
}

export default LoginForm