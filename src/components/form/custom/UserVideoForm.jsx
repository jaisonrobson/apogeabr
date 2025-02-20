import React from 'react'
import * as z from 'zod'

import ROUTES from 'router/routes'

import { FetcherForm, Input } from 'components'

import { youtubeLinkValidation } from 'validations'

const SubmitButton = (props) => (
    <Input
        width="400px"
        value='Enviar'
        type="submit"
        marginTop='15px'
        backgroundColor='#00000010'
        border='2px solid gray'
        onHover={{
            animation: {
                property: 'submitButtonAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes submitButtonAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

const userVideoValidationSchema = z.object({
    link: youtubeLinkValidation,
})

const UserVideoForm = ({ children, ...props }) => (
    <FetcherForm
        allowedProperties={['link']}
        validationSchema={userVideoValidationSchema}
        action={ROUTES.USER_PROFILE_VIDEOS_SUBMIT.path}
        onlyTouchedFields={true}
        {...props}
    >
        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
            children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
    </FetcherForm>
)

UserVideoForm.SubmitButton = SubmitButton
UserVideoForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default UserVideoForm