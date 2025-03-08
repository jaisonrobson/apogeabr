import React from 'react'
import axios from 'axios'
import * as z from 'zod'
import { useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

import { FetcherForm, Input } from 'components'

import { nameValidation, countryCodeValidation, oneMegabyteImageValidation } from 'validations'

const SubmitButton = (props) => (
    <Input
        value='Cadastrar'
        type="submit"
        backgroundColor='#00000010'
        border='2px solid gray'
        onHover={{
            animation: {
                property: 'languageSubmitAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes languageSubmitAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

const validationSchema = z.object({
    name: nameValidation,
    countrycode: countryCodeValidation,
    image: oneMegabyteImageValidation,
})

const CreateLanguageForm = ({ children, ...props }) => (
    <FetcherForm
        allowedProperties={['name', 'countrycode', 'image']}
        validationSchema={validationSchema}
        action={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES_SUBMIT.path}
        defaultForm={false}
        {...props}
    >
        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
            children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
    </FetcherForm>
)

CreateLanguageForm.SubmitButton = SubmitButton
CreateLanguageForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default CreateLanguageForm