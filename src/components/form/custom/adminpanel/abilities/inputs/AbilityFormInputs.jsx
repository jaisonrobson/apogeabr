import React, { Fragment } from 'react'
import _ from 'lodash'

import {
    FormattedInput,
    HR,
    Row,
    Col,
    Span,
    ImageInput,
    RenderCollectiveInputs,    
} from 'components'

const AbilityFormInputs = ({
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
        <ImageInput
            register={register}
            setValue={setValue}
            errors={errors}
            backendErrors={backendErrors}
            reloadInformation={!isLoadingLateValues}
            additiveImageProps={{
                marginLeft: '3rem'
            }}
        />

        <FormattedInput
            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/natures/search`}
            defaultValueFetchEndpoint={`natures`}
            defaultValueResponsePayloadPath={["data"]}
            searchPayloadIdPath={["id"]}
            searchPayloadNamePath={["nature_translation", "name"]}
            name="nature_id"
            label="Natureza:"
            errorMessage={errors?.nature_id?.message}
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

        <FormattedInput
            name="magic"
            label="Magia:"
            errorMessage={errors?.magic?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="weaponskill"
            label="Habilidade com armas:"
            errorMessage={errors?.weaponskill?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="mana"
            label="Mana:"
            errorMessage={errors?.mana?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="health"
            label="Vida:"
            errorMessage={errors?.health?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="duration"
            label="Duração:"
            errorMessage={errors?.duration?.message}
            type="number"
            step="0.01"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="cooldown"
            label="Tempo de recarga:"
            errorMessage={errors?.cooldown?.message}
            type="number"
            step="0.01"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="mindamage"
            label="Dano minimo:"
            errorMessage={errors?.mindamage?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="maxdamage"
            label="Dano maximo:"
            errorMessage={errors?.maxdamage?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
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

export default AbilityFormInputs