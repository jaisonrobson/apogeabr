import React, { Fragment } from 'react'
import _ from 'lodash'

import { mountFormattedInputComponents } from 'util/json'

import { FormattedInput, HR, Row, Col, Span } from 'components'

const TraitFormInputs = ({
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
            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/icons/search`}
            defaultValueFetchEndpoint={`icons`}
            defaultValueResponsePayloadPath={["data"]}
            payloadIdPath={["id"]}
            payloadNamePath={["icon_translation", "name"]}
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
            name="slots"
            label="Quantidade de slots:"
            errorMessage={errors?.slots?.message}
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

export default TraitFormInputs