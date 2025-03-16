import React, { Fragment } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import { FormattedInput } from 'components'

const UserConfigurationSensitiveInputs = ({ register, errors, backendErrors, ...props }) => (
    <Fragment>
        <FormattedInput
            register={register}
            name="login"
            label="Usuario:"
            errorMessage={errors?.login?.message}
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="password"
            label="Senha:"
            errorMessage={errors?.password?.message}
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="confirmPassword"
            label="Confirme a senha:"
            errorMessage={errors?.confirmPassword?.message}
            fontFamily="arial"
        />
    </Fragment>
)

export default UserConfigurationSensitiveInputs