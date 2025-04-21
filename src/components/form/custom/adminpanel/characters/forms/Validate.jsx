import React from 'react'
import * as z from 'zod'

import ROUTES from 'router/routes'

import { RecordForm } from 'components'

import { sqidCodeValidation } from 'validations'

const characterValidationSchema = z.object({
    code: sqidCodeValidation,
})

const Form = ({ children, ...props }) => (
    <RecordForm
        additionalAllowedProperties={['code']}
        validationSchema={characterValidationSchema}
        action={ROUTES.USER_ADMIN_PANEL_CHARACTERS_VALIDATE_SUBMIT.path}
        defaultForm={false}
        {...props}
    >
        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
            children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
    </RecordForm>
)

Form.SubmitButton = RecordForm.SubmitButton
Form.SubmissionInfo = RecordForm.SubmissionInfo

export default Form