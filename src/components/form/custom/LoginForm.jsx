import React from 'react'
import * as z from 'zod'

import { FetcherForm, Row, Col, Input, FormattedInput, ApogeaHoverNavLink } from 'components'

import { userPasswordValidation, userLoginValidation } from 'validations'

const loginValidationSchema = z.object({
    login: userLoginValidation,
    password: userPasswordValidation,
})

const LoginForm = (props) => (
    <FetcherForm allowedProperties={['login', 'password']} validationSchema={loginValidationSchema} action="/user/login/submit">
        {(register, errors, backendErrors) => (
            <Row>
                <FormattedInput register={register} name="login" label="Usuario:" errorMessage={errors.login?.message} fontFamily="arial"/>
                <FormattedInput register={register} name="password" label="Senha:" errorMessage={errors.password?.message} fontFamily="arial"/>

                <Row>
                    {
                        backendErrors?.error
                        ? (
                            <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                                { backendErrors?.error }
                            </Col>
                        )
                        : <Col />
                    }
                </Row>

                <Row margin="10px 0px">
                    <Col textAlign='center'>
                        {`Não possui uma conta? `}
                        <ApogeaHoverNavLink hoverTextShadow="1px 1px 2px black" fontFamily="Retro Computer" to="/user/register/">Registre-se</ApogeaHoverNavLink>
                    </Col>
                </Row>

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
            </Row>
        )}
    </FetcherForm>
)

export default LoginForm