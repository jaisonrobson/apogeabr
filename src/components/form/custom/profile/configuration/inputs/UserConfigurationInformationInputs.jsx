import React, { Fragment } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import { generatePhoneNumberExample } from 'util/countriesPhoneNumbers'

import { FormattedInput } from 'components'

const UserConfigurationInformationInputs = ({ register, errors, backendErrors, setValue, ...props }) => {
    const { user } = useRouteLoaderData("root")
    const { locales } = useRouteLoaderData("configuration")

    return (
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
                name="phone_number"
                label={`Telefone:`}
                errorMessage={errors?.phone_number?.message}
                infoMessage={`Ex: ${generatePhoneNumberExample(user?.country_code)}`}
                placeholder={generatePhoneNumberExample(user?.country_code)}
                fontFamily="arial"
            />

            <FormattedInput
                disabled
                register={register}
                name="email"
                label="Email:"
                errorMessage={errors?.email?.message || backendErrors?.email?.[0]}
                fontFamily="arial"
            />

            <FormattedInput
                register={register}
                setValue={setValue}
                name="locale_id"
                label="Idioma:"
                type="dropdown"
                options={locales}
                defaultValue={user.locale_id}
                errorMessage={errors?.classtype?.message}
                fontFamily="arial"
            />
        </Fragment>
    )
}

export default UserConfigurationInformationInputs