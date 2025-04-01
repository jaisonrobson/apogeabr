import React, { Fragment, useState, useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useFormContext } from "react-hook-form"
import _ from 'lodash'

import { FormDataContext } from 'contexts'

import { mountFormattedInputComponents } from 'util/json'
import {
    nonNegativeInfiniteIntegerNumber,
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
    Accordion,
    RenderCollectiveInputs,
    AddDynamicRecordButton,
} from 'components'

const QuestFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    dynamicFields={},
    quest,
    displayTemporaryFields=false,
    setTemporaryFields,
    temporaryFields={},
    light=false,
    ...props
}) => {
    const { locales } = useRouteLoaderData("adminpanel_library")    
    const { value: { getValues } } = useFormContext()
    const { isReloadingData, enableReloadData, setSnapshot } = useContext(FormDataContext)
    const [ temporaryQuestStepFieldsCounter, setTemporaryQuestStepFieldsCounter ] = useState(1)

    const removeQuestStepField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_QUESTSTEPS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_QUESTSTEPS_collective: filtered
            }
        })
    }

    const addQuestStepField = () => {
        const index = temporaryQuestStepFieldsCounter

        const newFields = {
            [`TMPFY_collective_${index}`]: {
                collectiveName: `Novo Passo +${index}:`,
                collectiveId: index,
                [`TMPFY_QUESTSTEPS_order_number_${index}`]: {
                    type: 'number',
                    name: `order_number_TMPFY_${index}`,
                    label: 'Ordem:',
                    value: 1,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 1,
                    },
                },
                [`TMPFY_QUESTSTEPS_icon_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `icon_id_TMPFY_${index}`,
                    label: 'Icone:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/icons/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["icon_translation", "name"],
                        defaultValueFetchEndpoint: `icons`,
                        defaultValueResponsePayloadPath: ["data"],
                    },
                },
                [`TMPFY_QUESTSTEPS_location_id_${index}`]: {
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
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["location_translation", "name"],
                        defaultValueFetchEndpoint: `locations`,
                        defaultValueResponsePayloadPath: ["data"],
                    },
                },
                [`TMPFY_QUESTSTEPS_video_link_${index}`]: {
                    type: 'text',
                    name: `video_link_TMPFY_${index}`,
                    label: 'Video URL:',
                    value: "",
                    validation: youtubeLinkValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: ""
                    },
                },
                ..._.merge(
                    {},
                    ...locales.map(locale => ({
                    [`TMPFY_${index}_QUESTSTEPS_TRANSLATION_collective_${locale.id}`]: {
                        collectiveName: locale.name,
                        [`TMPFY_${index}_QUESTSTEPS_TRANSLATION_locale_id_${locale.id}`]: {
                            type: undefined,
                            label: '',
                            name: `locale_id_TMPFY_${index}_QUESTSTEPS_TRANSLATION_${locale.id}`,
                            value: locale.id,
                            validation: undefined,
                            isPersistedRecord: false,
                        },
                        [`TMPFY_${index}_QUESTSTEPS_TRANSLATION_name_${locale.id}`]: {
                            type: 'text',
                            name: `name_TMPFY_${index}_QUESTSTEPS_TRANSLATION_${locale.id}`,
                            label: 'Nome:',
                            value: "",
                            validation: alphabeticThreeHundredStringValidation,
                            isPersistedRecord: false,
                            extraProperties: {
                                defaultValue: ""
                            },
                        },
                        [`TMPFY_${index}_QUESTSTEPS_TRANSLATION_description_${locale.id}`]: {
                            type: 'textarea',
                            name: `description_TMPFY_${index}_QUESTSTEPS_TRANSLATION_${locale.id}`,
                            label: 'Descrição:',
                            value: "",
                            validation: alphabeticFiveHundredStringValidation,
                            isPersistedRecord: false,
                            extraProperties: {
                                defaultValue: ""
                            },
                        },
                    },
                })))
            }
        }

        setSnapshot(getValues())
    
        setTemporaryFields(oldValue => {
            // Clona o estado anterior
            const updated = { ...oldValue }
    
            // Se já existe o collective, adiciona os novos campos
            if (updated.TMPFY_QUESTSTEPS_collective) {
                updated.TMPFY_QUESTSTEPS_collective = {
                    ...updated.TMPFY_QUESTSTEPS_collective,
                    ...newFields,
                }
            } else {
                // Caso contrário, cria o collective do zero
                updated.TMPFY_QUESTSTEPS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryQuestStepFieldsCounter(oldValue => (oldValue + 1))
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
                name="video_link"
                label="Video URL:"
                errorMessage={errors?.video_link?.message}
                type="text"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <RenderCollectiveInputs
                collectiveInputs={dynamicFields}
                register={register}
                setValue={setValue}
                errors={errors}
                light={light}
                reloadInformation={!isLoadingLateValues}
                doFormLateLoadInformations={doFormLateLoadInformations}
            />

            {
                !displayTemporaryFields ? null : (
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header targetId="1">
                                <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                    Passos
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
                                                addRecordDescription="Passo"
                                                onClick={addQuestStepField}
                                            />
                                        </Col>
                                    </Row>

                                    <Row padding="0px" margin="0px" marginTop="15px">
                                        <HR light={!light} height="2px" />
                                    </Row>

                                    <RenderCollectiveInputs
                                        extractCollectives="NESTEDDYNAMICFIELD_QUESTSTEPS_collective"
                                        collectiveInputsSearchDepth={2}
                                        collectiveInputs={dynamicFields}
                                        register={register}
                                        errors={errors}
                                        light={light}
                                        setValue={setValue}
                                        reloadInformation={!isLoadingLateValues}
                                        doFormLateLoadInformations={doFormLateLoadInformations}
                                        deleteEndpoint={(group) => `quests/${quest.id}/quest_steps/${group.collectiveId}`}
                                    />

                                    <RenderCollectiveInputs
                                        collectiveKeyPath={["TMPFY_QUESTSTEPS_collective"]}
                                        collectiveInputs={temporaryFields}
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        light={light}
                                        onRemoveCollectiveInputs={removeQuestStepField}
                                        reloadInformation={false}
                                        doFormLateLoadInformations={doFormLateLoadInformations}
                                        collectiveInputsSearchDepth={2}
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

export default QuestFormInputs