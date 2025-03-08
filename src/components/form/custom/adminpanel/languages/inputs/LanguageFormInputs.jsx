import React, { Fragment } from 'react'

import { FormattedInput, ImageInput } from 'components'

const LanguageFormInputs = ({ register, errors, backendErrors, setValue, ...props }) => (
    <Fragment>
        <FormattedInput
            register={register}
            name="name"
            label="Nome:"
            errorMessage={errors?.name?.message}
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="countrycode"
            label={`Código de país:`}
            errorMessage={errors?.countrycode?.message}
            fontFamily="arial"
        />

        <ImageInput
            register={register}
            setValue={setValue}
            errors={errors}
            backendErrors={backendErrors}
            additiveImageProps={{
                marginLeft: '3rem'
            }}
            {...props}
        />
    </Fragment>
)

export default LanguageFormInputs