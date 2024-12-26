import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Form, Input, FormattedInput } from 'components'

import { userPasswordValidation } from 'validations'

const registerValidationSchema = z.object({
    login: z.string()
        .min(8, { message: 'Necessário ao menos 8 caracteres' })
        .max(15, { message: 'Máximo de 15 caracteres atingido' }),
    password: userPasswordValidation,
    confirmPassword: userPasswordValidation,
    email: z.string()
        .min(1, { message: "Necessário ao menos 1 caractere" })
        .email("Email não é válido"),
        // .refine(async (data) => await checkIfEmailIsValid(data), "Este email já existe em nossa base de dados"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "A senha não confere com a confirmação",
            path: ['confirmPassword']
        })
    }
})

const RegisterForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerValidationSchema) })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
            <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>
            <FormattedInput register={register} name="confirmPassword" label="Confirme a senha:" errorMessage={errors.confirmPassword?.message} fontFamily="arial"/>
            <FormattedInput register={register} name="email" label="Email:" errorMessage={errors.email?.message} fontFamily="arial"/>

            <Input
                value='Registrar'
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

export default RegisterForm