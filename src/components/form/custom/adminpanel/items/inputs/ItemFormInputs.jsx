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

const ItemFormInputs = ({
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
            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/item_categories/search`}
            defaultValueFetchEndpoint={`item_categories`}
            defaultValueResponsePayloadPath={["data"]}
            searchPayloadIdPath={["id"]}
            searchPayloadNamePath={["item_category_translation", "name"]}
            name="item_category_id"
            label="Categoria:"
            errorMessage={errors?.item_category_id?.message}
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
            name="maxstack"
            label="Quantidade máxima:"
            errorMessage={errors?.maxstack?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="weight"
            label="Peso:"
            errorMessage={errors?.weight?.message}
            type="number"
            step="0.01"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="armor"
            label="Armadura:"
            errorMessage={errors?.armor?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="damage"
            label="Dano:"
            errorMessage={errors?.damage?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="attackspeed"
            label="Velocidade de ataque:"
            errorMessage={errors?.attackspeed?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="range"
            label="Alcance:"
            errorMessage={errors?.range?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="defense"
            label="Defesa:"
            errorMessage={errors?.defense?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="size"
            label="Tamanho:"
            errorMessage={errors?.size?.message}
            type="number"
            fontFamily="arial"
            register={register}
            setValue={setValue}
        />

        <FormattedInput
            name="slots"
            label="Slots:"
            errorMessage={errors?.slots?.message}
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

export default ItemFormInputs 