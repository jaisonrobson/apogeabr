import React, { Fragment } from 'react'

import { CLASSES_NICKNAMES } from 'util/characterClasses'

import { FormattedInput } from 'components'

const CharacterCreationMainInputs = ({ register, errors, backendErrors, setValue, ...props }) => (
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
            setValue={setValue}
            name="classtype"
            label="Classe:"
            type="dropdown"
            options={CLASSES_NICKNAMES}
            errorMessage={errors?.classtype?.message}
            fontFamily="arial"
        />
    </Fragment>
)

export default CharacterCreationMainInputs