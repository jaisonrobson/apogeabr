import React from 'react'
import axios from 'axios'
import * as z from 'zod'
import { useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { FetcherForm, Input, FormattedInput, Row, Col } from 'components'

import { loginPasswordValidation, userImageValidation, userPhoneNumberValidation, nameValidation } from 'validations'

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

const UserConfigurationForm = ({ children, ...props }) => {
    const { user } = useRouteLoaderData("root")

    const userUpdateValidationSchema = z.object({
        name: nameValidation.optional(),
        phone_number: userPhoneNumberValidation(user?.country_code).optional(),
        image: userImageValidation.optional(),
        login: loginPasswordValidation.optional(),
        password: loginPasswordValidation.optional(),
        confirmPassword: loginPasswordValidation.optional(),
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "A senha não confere com a confirmação",
                path: ['confirmPassword']
            })
        }
    })

    const onSubmit = (data) => ({ ...data, user_id: user?.id })
    
    return (
        <FetcherForm
            allowedProperties={['name', 'login', 'password', 'phone_number', 'image', 'user_id']}
            enforceProperties={['user_id']}
            externalSchema={userUpdateValidationSchema}
            validationSchema={z.object({})}
            action={ROUTES.USER_PROFILE_CONFIGURATION_SUBMIT.path}
            defaultForm={false}
            onlyTouchedFields={true}
            onSubmit={onSubmit}
            {...props}
        >
            {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
                children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
        </FetcherForm>
    )
}

UserConfigurationForm.SubmitButton = SubmitButton
UserConfigurationForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default UserConfigurationForm