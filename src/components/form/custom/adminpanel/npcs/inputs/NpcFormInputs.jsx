import React, { Fragment, useState, useContext } from 'react'
import { useFormContext } from "react-hook-form"
import _ from 'lodash'

import { FormDataContext } from 'contexts'

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import { mountFormattedInputComponents } from 'util/json'
import { idValidation, timeValidation } from 'validations'

import {
    FormattedInput,
    HR,
    Row,
    Col,
    Span,
    ImageInput,
    Button,
    Div,
    Icon,
    Accordion,
    RenderCollectiveInputs,
} from 'components'

const AddDynamicRecordButton = ({ addRecordDescription = "novo registro", onClick }) => {
    const [ isHovered, setIsHovered ] = useState(false)

    const onMouseEnter = () => setIsHovered(true)
    const onMouseLeave = () => setIsHovered(false)

    return (
        <Button
            width="100%"
            onHover={{
                backgroundColor: "lightblue",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            color={isHovered ? "black" : "white"}
            onClick={onClick}
        >
            <Div
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="15px"                
            >
                <Icon
                    icon={faSquarePlus}
                    color={isHovered ? "black" : "white"}
                />

                Adicionar {addRecordDescription}
            </Div>
        </Button>
    )
}

const NpcFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    dynamicFields={},
    npc,
    displayTemporaryFields=false,
    setTemporaryFields,
    temporaryFields={},
    light=false,
    ...props
}) => {
    const { value: { getValues } } = useFormContext()
    const { isReloadingData, enableReloadData, setSnapshot } = useContext(FormDataContext)
    const [ temporaryLocationFieldsCounter, setTemporaryLocationFieldsCounter ] = useState(0)

    const removeLocationField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_LOCATIONS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_LOCATIONS_collective: filtered
            }
        })
    }

    const addLocationField = () => {
        const index = temporaryLocationFieldsCounter

        const newFields = {
            [`TMPFY_collective_${index}`]: {
                collectiveName: `Local ${index}:`,
                collectiveId: index,
                [`TMPFY_LOCATIONS_location_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `location_id_TMPFY_${index}`,
                    label: 'Local:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/locations/search`,
                        defaultValueFetchEndpoint: `locations`,
                        defaultValueResponsePayloadPath: ["data"],
                        payloadIdPath: ["id"],
                        payloadNamePath: ["location_translation", "name"],
                    },
                },
                [`TMPFY_LOCATIONS_visit_at_${index}`]: {
                    type: 'time',
                    name: `visit_at_TMPFY_${index}`,
                    label: 'Aparece às:',
                    value: "23:59",
                    validation: timeValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: "23:59"
                    },
                },
            }
        }

        setSnapshot(getValues())
    
        setTemporaryFields(oldValue => {
            // Clona o estado anterior
            const updated = { ...oldValue }
    
            // Se já existe o collective, adiciona os novos campos
            if (updated.TMPFY_LOCATIONS_collective) {
                updated.TMPFY_LOCATIONS_collective = {
                    ...updated.TMPFY_LOCATIONS_collective,
                    ...newFields,
                }
            } else {
                // Caso contrário, cria o collective do zero
                updated.TMPFY_LOCATIONS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryLocationFieldsCounter(oldValue => (oldValue + 1))
    }
    
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
                }} />

            
            <RenderCollectiveInputs
                collectiveInputs={dynamicFields}
                register={register}
                errors={errors}
                light={light}
                setValue={setValue}
                reloadInformation={!isLoadingLateValues}
                doFormLateLoadInformations={doFormLateLoadInformations}
            />

            {
                !displayTemporaryFields ? null : (
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header targetId="1">
                                <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                    Locais
                                </Span>
                            </Accordion.Header>

                            <Accordion.Body accordionId="1">
                                <Row>
                                    <Row padding="0px" margin="0px">
                                        <HR light={!light} height="2px" />
                                    </Row>

                                    <Row>
                                        <Col>
                                            <AddDynamicRecordButton
                                                addRecordDescription="Local"
                                                onClick={addLocationField}
                                            />
                                        </Col>
                                    </Row>

                                    <Row padding="0px" margin="0px" marginTop="15px">
                                        <HR light={!light} height="2px" />
                                    </Row>

                                    <RenderCollectiveInputs
                                        extractCollectives="NESTEDDYNAMICFIELD_collective"
                                        collectiveInputs={dynamicFields}
                                        register={register}
                                        errors={errors}
                                        light={light}
                                        setValue={setValue}
                                        reloadInformation={!isLoadingLateValues}
                                        doFormLateLoadInformations={doFormLateLoadInformations}
                                        deleteEndpoint={(group) => `locations_npcs/${_.find(group, (value, key) => _.includes(key, "location_id")).value}/${npc.id}`}
                                    />

                                    <RenderCollectiveInputs
                                        collectiveKeyPath={["TMPFY_LOCATIONS_collective"]}
                                        collectiveInputs={temporaryFields}
                                        register={register}
                                        errors={errors}
                                        light={light}
                                        onRemoveCollectiveInputs={removeLocationField}
                                        reloadInformation={false}
                                        doFormLateLoadInformations={doFormLateLoadInformations}
                                        setValue={setValue}
                                    />
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }                
        </Fragment>
    )
}

export default NpcFormInputs