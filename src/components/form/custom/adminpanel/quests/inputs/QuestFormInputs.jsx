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
    const { setSnapshot } = useContext(FormDataContext)
    const [ temporaryQuestStepFieldsCounter, setTemporaryQuestStepFieldsCounter ] = useState(1)
    const [ temporaryQuestItemFieldsCounter, setTemporaryQuestItemFieldsCounter ] = useState(1)

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

    const removeQuestItemField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_QUESTITEMS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_QUESTITEMS_collective: filtered
            }
        })
    }

    const addQuestStepField = () => {
        const index = temporaryQuestStepFieldsCounter

        const newFields = {
            [`TMPFY_QUESTSTEPS_collective_${index}`]: {
                collectiveName: `Novo passo +${index}:`,
                collectiveId: index,
                [`TMPFY_QUESTSTEPS_order_number_${index}`]: {
                    type: 'number',
                    name: `order_number_TMPFY_QUESTSTEPS_${index}`,
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
                    name: `icon_id_TMPFY_QUESTSTEPS_${index}`,
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
                    name: `location_id_TMPFY_QUESTSTEPS_${index}`,
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
                    name: `video_link_TMPFY_QUESTSTEPS_${index}`,
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
            const updated = { ...oldValue }
    
            if (updated.TMPFY_QUESTSTEPS_collective) {
                updated.TMPFY_QUESTSTEPS_collective = {
                    ...updated.TMPFY_QUESTSTEPS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_QUESTSTEPS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryQuestStepFieldsCounter(oldValue => (oldValue + 1))
    }

    const addQuestItemField = () => {
        const index = temporaryQuestItemFieldsCounter

        const newFields = {
            [`TMPFY_QUESTITEMS_collective_${index}`]: {
                collectiveName: `Nova recompensa +${index}:`,
                collectiveId: index,
                [`TMPFY_QUESTITEMS_item_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `item_id_TMPFY_QUESTITEMS_${index}`,
                    label: 'Item:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/items/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["item_translation", "name"],
                        defaultValueFetchEndpoint: `items`,
                        defaultValueResponsePayloadPath: ["data"],
                    },
                },
                [`TMPFY_QUESTITEMS_quantity_${index}`]: {
                    type: 'number',
                    name: `quantity_TMPFY_QUESTITEMS_${index}`,
                    label: 'Quantidade:',
                    value: 0,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                    },
                },
            }
        }

        setSnapshot(getValues())
    
        setTemporaryFields(oldValue => {
            const updated = { ...oldValue }
    
            if (updated.TMPFY_QUESTITEMS_collective) {
                updated.TMPFY_QUESTITEMS_collective = {
                    ...updated.TMPFY_QUESTITEMS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_QUESTITEMS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryQuestItemFieldsCounter(oldValue => (oldValue + 1))
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
                extractCollectives="DIFY"
                collectiveInputs={dynamicFields}
                register={register}
                setValue={setValue}
                errors={errors}
                light={light}
                reloadInformation={!isLoadingLateValues}
                doFormLateLoadInformations={doFormLateLoadInformations} />

            {!displayTemporaryFields ? null : (
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header targetId="1">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                Passos da Quest
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
                                            onClick={addQuestStepField} />
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
                                    deleteEndpoint={(group) => `quests/${quest.id}/quest_steps/${group.collectiveId}`} />

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
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item>
                        <Accordion.Header targetId="2">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                Recompensa de Quest
                            </Span>
                        </Accordion.Header>

                        <Accordion.Body accordionId="2">
                            <Row>
                                <Row padding="0px" margin="0px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <Row>
                                    <Col>
                                        <AddDynamicRecordButton
                                            addRecordDescription="Recompensa"
                                            onClick={addQuestItemField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_QUESTITEMS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${group.collectiveId}/quests/${quest.id}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_QUESTITEMS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeQuestItemField}
                                    reloadInformation={false}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </Fragment>
    )
}

export default QuestFormInputs