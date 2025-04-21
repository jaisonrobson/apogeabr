import React, { Fragment } from 'react'

import {
    FormattedInput,
} from 'components'

const CharacterValidationInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    dynamicFields={},
    light=false,
    ...props
}) => (
    <Fragment>
        <FormattedInput
            name="code"
            label="Código de validação:"
            errorMessage={errors?.code?.message}
            fontFamily="arial"
            register={register}
            setValue={setValue}
            light={light}
            labelProps={{
                color: light ? "white" : "white",
            }}
        />
    </Fragment>
)

export default CharacterValidationInputs