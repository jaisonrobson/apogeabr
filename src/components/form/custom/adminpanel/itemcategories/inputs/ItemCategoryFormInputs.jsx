import React, { Fragment, useState, useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useFormContext } from "react-hook-form"
import _ from 'lodash'

import { FormDataContext } from 'contexts'

import {
    nonNegativeInfiniteIntegerNumber,
    nonNegativeInfiniteFloatNumber,
    idValidation,
    youtubeLinkValidation,
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation
} from 'validations'

import {
    FormattedInput,
    HR,
    Row,
    Col,
    Span,
    ImageInput,
    RenderCollectiveInputs,
    AddDynamicRecordButton,
    Accordion,
} from 'components'

const ItemCategoryFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    monster,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    displayTemporaryFields=false,
    dynamicFields={},
    setTemporaryFields,
    temporaryFields={},
    light=false,
    ...props
}) => (
    <Fragment>
        <FormattedInput
            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/icons/search`}
            defaultValueFetchEndpoint={`icons`}
            defaultValueResponsePayloadPath={["data"]}
            searchPayloadIdPath={["id"]}
            searchPayloadNamePath={["icon_translation", "name"]}
            name="icon_id"
            label="Icone:"
            errorMessage={errors?.icon_id?.message}
            type="elasticdropdown"
            reloadInformation={!isLoadingLateValues}
            doFormLateLoadInformations={doFormLateLoadInformations}
            fontFamily="arial"
            register={register}
            setValue={setValue}
            togglerProperties={{
                color: 'white'
            }}
        />

        <RenderCollectiveInputs
            collectiveInputs={dynamicFields}
            register={register}
            setValue={setValue}
            errors={errors}
            light={light}
            reloadInformation={!isLoadingLateValues}
            doFormLateLoadInformations={doFormLateLoadInformations}
        />
    </Fragment>
)

export default ItemCategoryFormInputs