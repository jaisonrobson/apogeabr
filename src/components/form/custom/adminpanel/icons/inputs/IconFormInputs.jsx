import React, { Fragment } from 'react'
import _ from 'lodash'

import { mountFormattedInputComponents } from 'util/json'

import { FormattedInput, ImageInput, HR, Row, Col, Span } from 'components'

const IconFormInputs = ({ register, errors, backendErrors, setValue, isLoadingLateValues=false, dynamicFields={}, light=false, ...props }) => (
    <Fragment>
        <ImageInput
            register={register}
            setValue={setValue}
            errors={errors}
            backendErrors={backendErrors}
            reloadImage={!isLoadingLateValues}
            additiveImageProps={{
                marginLeft: '3rem'
            }}
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

export default IconFormInputs