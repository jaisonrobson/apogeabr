import React, { Fragment } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import { FormattedInput } from 'components'

const UserConfigurationInformationInputs = ({ register, errors, backendErrors, ...props }) => (
    <Fragment>
        <FormattedInput
            minWidth="0px"
            width="auto"
            register={register}
            name="name"
            label="Nome:"
            errorMessage={errors?.name?.message}
            fontFamily="arial"
        />

        <FormattedInput
            minWidth="0px"
            width="auto"
            register={register}
            name="phone_number"
            label="Telefone:"
            errorMessage={errors?.phone_number?.message}
            fontFamily="arial"
        />

        <FormattedInput
            disabled
            minWidth="0px"
            width="auto"
            register={register}
            name="email"
            label="Email:"
            errorMessage={errors?.email?.message || backendErrors?.email?.[0]}
            fontFamily="arial"
        />
    </Fragment>
)

export default UserConfigurationInformationInputs