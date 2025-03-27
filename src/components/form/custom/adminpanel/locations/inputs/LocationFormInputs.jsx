import React, { Fragment } from 'react'
import _ from 'lodash'

import { mountFormattedInputComponents } from 'util/json'

import { FormattedInput, ImageInput, HR, Row, Col, Span } from 'components'

const LocationFormInputs = ({
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
            register={register}
            setValue={setValue}
            name="iscity"
            label="É uma cidade?"
            errorMessage={errors?.iscity?.message}
            type="radiobuttons"
            reloadInformation={!isLoadingLateValues}
            doFormLateLoadInformations={doFormLateLoadInformations}
            fontFamily="arial"
        />

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

        <FormattedInput
            register={register}
            setValue={setValue}
            name="webx"
            label="Posição mapa do site (X):"
            errorMessage={errors?.webx?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            setValue={setValue}
            name="weby"
            label="Posição mapa do site (Y):"
            errorMessage={errors?.weby?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            setValue={setValue}
            name="webz"
            label="Posição mapa do site (Z):"
            errorMessage={errors?.webz?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            setValue={setValue}
            name="x"
            label="Posição mapa do jogo (X):"
            errorMessage={errors?.x?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            setValue={setValue}
            name="y"
            label="Posição mapa do jogo (Y):"
            errorMessage={errors?.y?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            setValue={setValue}
            name="z"
            label="Posição mapa do jogo (Z):"
            errorMessage={errors?.z?.message}
            type="number"
            fontFamily="arial"
        />

        {mountFormattedInputComponents(
            dynamicFields,
            (dify) => (
                <FormattedInput
                    key={dify.name}
                    register={register}
                    name={dify.name}
                    label={dify.label}
                    errorMessage={errors?.[dify.name]?.message}
                    type={dify.type}
                    fontFamily="arial"
                />
            ),
            (groupedInputs, group) => (
                <Row key={group.collectiveName}>
                    <Row>
                        <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                            {group.collectiveName}
                        </Span>
                    </Row>
                    <Row padding="0px" margin="0px">
                        <HR light={!light} height="2px" />
                    </Row>
                    <Row>
                        <Col>
                            {groupedInputs}
                        </Col>
                    </Row>
                </Row>
            )
        )}
    </Fragment>
)

export default LocationFormInputs