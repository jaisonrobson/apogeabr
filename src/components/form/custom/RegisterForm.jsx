import React from 'react'
import axios from 'axios'
import * as z from 'zod'

import { FetcherForm, Input, FormattedInput, Row } from 'components'

import { userPasswordValidation, userLoginValidation } from 'validations'

const checkIfEmailExists = async (email) => {
    try {
        const response = await axios.get(`http://localhost:3001/users/email_exists/${email}`, { params: { email } })
        return !response.data.exists
    } catch (error) {
        throw new Error("Erro ao validar o email. Tente novamente mais tarde.")
    }
}

const registerValidationSchema = z.object({
    login: userLoginValidation,
    password: userPasswordValidation,
    confirmPassword: userPasswordValidation,
    email: z.string()
        .min(1, { message: "Necessário ao menos 1 caractere" })
        .email("Email não é válido")
        .refine(checkIfEmailExists, "Este email já existe em nossa base de dados"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "A senha não confere com a confirmação",
            path: ['confirmPassword']
        })
    }
})

const RegisterForm = (props) => (
    <FetcherForm
        allowedProperties={['login', 'password', 'email']}
        validationSchema={registerValidationSchema}
        action="/user/register/submit"
    >
        {(register, errors, backendErrors) => (
            <Row>
                <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="confirmPassword" label="Confirme a senha:" errorMessage={errors.confirmPassword?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="email" label="Email:" errorMessage={errors.email?.message || backendErrors?.email?.[0]} fontFamily="arial"/>

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
            </Row>
        )}
    </FetcherForm>
)

export default RegisterForm