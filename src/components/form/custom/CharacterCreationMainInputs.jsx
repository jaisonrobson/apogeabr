import React, { Fragment } from 'react'

import { FormattedInput } from 'components'

const CharacterCreationMainInputs = ({ register, errors, backendErrors, ...props }) => (
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
            name="creation_date"
            label={`Data de criação:`}
            type="date"
            errorMessage={errors?.creation_date?.message}
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="classtype"
            label="Classe:"
            errorMessage={errors?.classtype?.message}
            fontFamily="arial"
        />
    </Fragment>
)

export default CharacterCreationMainInputs