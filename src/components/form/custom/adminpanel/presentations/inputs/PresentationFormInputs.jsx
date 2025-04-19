import React, { Fragment, useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useFormContext } from "react-hook-form"

import { FormDataContext } from 'contexts'

import {
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
    idValidation,
} from 'validations'

import {
    FormattedInput,
    Row,
    Col,
    RenderCollectiveInputs,
} from 'components'

const PresentationFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    presentation,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    displayTemporaryFields=false,
    dynamicFields={},
    setTemporaryFields,
    temporaryFields={},
    light=false,
    ...props
}) => {
    const { locales } = useRouteLoaderData("adminpanel")    
    const { value: { getValues } } = useFormContext()
    const { setSnapshot } = useContext(FormDataContext)

    return (
        <Fragment>
            <RenderCollectiveInputs
                collectiveInputs={dynamicFields}
                reloadInformation={!isLoadingLateValues}
                doFormLateLoadInformations={doFormLateLoadInformations}
                errors={errors}
                backendErrors={backendErrors}
                register={register}
                setValue={setValue}                
                light={light}
            />
        </Fragment>
    )
}

export default PresentationFormInputs 