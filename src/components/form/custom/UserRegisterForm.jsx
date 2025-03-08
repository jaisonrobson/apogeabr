import React from 'react'
import * as z from 'zod'

import ROUTES from 'router/routes'

import { FetcherForm, Input, FormattedInput, Row } from 'components'

import { passwordValidation, loginValidation, emailValidation } from 'validations'

const registerValidationSchema = z.object({
    login: loginValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
    email: emailValidation,
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "A senha não confere com a confirmação",
            path: ['confirmPassword']
        })
    }
})

const UserRegisterForm = (props) => (
    <FetcherForm
        allowedProperties={['login', 'password', 'email']}
        validationSchema={registerValidationSchema}
        action={ROUTES.USER_REGISTER_SUBMIT.path}
    >
        {({ register, errors, backendErrors }) => (
            <Row>
                <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="confirmPassword" label="Confirme a senha:" errorMessage={errors.confirmPassword?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="email" label="Email:" errorMessage={errors.email?.message || backendErrors?.email?.[0]} fontFamily="arial"/>

                <Input
                    light
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

export default UserRegisterForm