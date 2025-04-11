import React, { Fragment, useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useFormContext } from "react-hook-form"

import { FormDataContext } from 'contexts'

import {
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
    idValidation,
    twoMegabytesImageValidation,
} from 'validations'

import {
    FormattedInput,
    Row,
    Col,
    ImageInput,
    RenderCollectiveInputs,
} from 'components'

const NewsPostFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    newsPost,
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
            <ImageInput
                register={register}
                setValue={setValue}
                errors={errors}
                backendErrors={backendErrors}
                reloadInformation={!isLoadingLateValues}
                additiveImageProps={{
                    marginLeft: '3rem'
                }} />
            
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

export default NewsPostFormInputs 