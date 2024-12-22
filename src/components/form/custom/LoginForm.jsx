import React, { forwardRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { login } from 'store/actions'

import { Form, Row, Col, Input, FormattedInput } from 'components'

import { ReducerContext } from 'contexts'

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
    const { dispatch, ...state } = useContext(ReducerContext)

    const onSubmit = (data) => {
        // login(dispatch, data)
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
            <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>
            
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