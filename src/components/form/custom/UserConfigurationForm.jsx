import React from 'react'
import axios from 'axios'
import * as z from 'zod'

import ROUTES from 'router/routes'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { FetcherForm, Input, FormattedInput, Row, Col } from 'components'

import { userPasswordValidation, userLoginValidation } from 'validations'

const userUpdateValidationSchema = z.object({
    login: userLoginValidation.nullish(),
    password: userPasswordValidation.or(z.string().nullish()),
    confirmPassword: userPasswordValidation.or(z.string().nullish()),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "A senha não confere com a confirmação",
            path: ['confirmPassword']
        })
    }
})

const SubmitButton = (props) => (
    <Input
        width="400px"
        value='Atualizar'
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
        {...props}
    />
)

const UserConfigurationForm = ({ children, ...props }) => (
    <FetcherForm
        allowedProperties={['name', 'login', 'password', 'phone_number', 'image']}
        validationSchema={userUpdateValidationSchema}
        action={ROUTES.USER_PROFILE_CONFIGURATION_SUBMIT.path}
        defaultForm={false}
        onlyTouchedFields={true}
        {...props}
    >
        {(register, errors, backendErrors, fetcher, setValue) => children(register, errors, backendErrors, fetcher, setValue)}
    </FetcherForm>
)

UserConfigurationForm.SubmitButton = SubmitButton
UserConfigurationForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default UserConfigurationForm