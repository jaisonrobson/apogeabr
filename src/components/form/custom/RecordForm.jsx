import React from 'react'
import * as z from 'zod'

import ROUTES from 'router/routes'

import { FetcherForm, Input } from 'components'

const SubmitButton = ({ animationBackgroundColor = "lightblue", animationName = "languageSubmitAnimation", ...props }) => (
    <Input
        value='Cadastrar'
        type="submit"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: `${animationName} 0.5s linear 0s infinite alternate`,
                corpse: `@keyframes ${animationName} {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${animationBackgroundColor}; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

const RecordForm = ({
    children,
    additionalValidations = {},
    additionalAllowedProperties=[],
    additionalEnforcedProperties=[],
    additionalSubmitValues={},
    ...props
}) => {
    const validationSchema = z.object({
        ...additionalValidations,
    })

    const onBeforeSubmit = (data) => ({ ...data, ...additionalSubmitValues})

    return (
        <FetcherForm
            allowedProperties={additionalAllowedProperties}
            enforceProperties={additionalEnforcedProperties}
            validationSchema={validationSchema}
            action={ROUTES.HOME.path}
            defaultForm={false}
            onBeforeSubmit={onBeforeSubmit}
            {...props}
        >
            {(childrenProps) => children(childrenProps)}
        </FetcherForm>
    )
}

RecordForm.SubmitButton = SubmitButton
RecordForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default RecordForm