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

const MonsterFormInputs = ({
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
}) => {
    const { locales } = useRouteLoaderData("adminpanel")    
    const { value: { getValues } } = useFormContext()
    const { setSnapshot } = useContext(FormDataContext)
    const [ temporaryMonsterAbilityFieldsCounter, setTemporaryMonsterAbilityFieldsCounter ] = useState(1)
    const [ temporaryMonsterItemFieldsCounter, setTemporaryMonsterItemFieldsCounter ] = useState(1)

    const removeMonsterAbilityField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_MONSTERABILITIES_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_MONSTERABILITIES_collective: filtered
            }
        })
    }

    const removeMonsterItemField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_MONSTERITEMS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_MONSTERITEMS_collective: filtered
            }
        })
    }

    const addMonsterAbilityField = () => {
        const index = temporaryMonsterAbilityFieldsCounter

        const newFields = {
            [`TMPFY_MONSTERABILITIES_collective_${index}`]: {
                collectiveName: `Nova habilidade +${index}:`,
                collectiveId: index,
                [`TMPFY_MONSTERABILITIES_ability_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `ability_id_TMPFY_MONSTERABILITIES_${index}`,
                    label: 'Habilidade:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/abilities/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["ability_translation", "name"],
                        defaultValueFetchEndpoint: `abilities`,
                        defaultValueResponsePayloadPath: ["data"],
                    },
                },
                [`TMPFY_MONSTERABILITIES_min_${index}`]: {
                    type: 'number',
                    name: `min_TMPFY_MONSTERABILITIES_${index}`,
                    label: 'Minimo:',
                    value: 0,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                    },
                },
                [`TMPFY_MONSTERABILITIES_max_${index}`]: {
                    type: 'number',
                    name: `max_TMPFY_MONSTERABILITIES_${index}`,
                    label: 'Maximo:',
                    value: 0,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                    },
                },
                [`TMPFY_MONSTERABILITIES_duration_${index}`]: {
                    type: 'number',
                    name: `duration_TMPFY_MONSTERABILITIES_${index}`,
                    label: 'Duração:',
                    value: 0,
                    validation: nonNegativeInfiniteFloatNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                        step: "0.01",
                    },
                },
                [`TMPFY_MONSTERABILITIES_cooldown_${index}`]: {
                    type: 'number',
                    name: `cooldown_TMPFY_MONSTERABILITIES_${index}`,
                    label: 'Recarga:',
                    value: 0,
                    validation: nonNegativeInfiniteFloatNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                        step: "0.01",
                    },
                },
            }
        }

        setSnapshot(getValues())
    
        setTemporaryFields(oldValue => {
            // Clona o estado anterior
            const updated = { ...oldValue }
    
            // Se já existe o collective, adiciona os novos campos
            if (updated.TMPFY_MONSTERABILITIES_collective) {
                updated.TMPFY_MONSTERABILITIES_collective = {
                    ...updated.TMPFY_MONSTERABILITIES_collective,
                    ...newFields,
                }
            } else {
                // Caso contrário, cria o collective do zero
                updated.TMPFY_MONSTERABILITIES_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryMonsterAbilityFieldsCounter(oldValue => (oldValue + 1))
    }

    const addMonsterItemField = () => {
        const index = temporaryMonsterItemFieldsCounter

        const newFields = {
            [`TMPFY_MONSTERITEMS_collective_${index}`]: {
                collectiveName: `Novo item +${index}:`,
                collectiveId: index,
                [`TMPFY_MONSTERITEMS_item_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `item_id_TMPFY_MONSTERITEMS_${index}`,
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
                        forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_monsters/forbidden_items_by_monster?monster_id=${monster.id}`,
                    },
                },
                [`TMPFY_MONSTERITEMS_minquantity_${index}`]: {
                    type: 'number',
                    name: `minquantity_TMPFY_MONSTERITEMS_${index}`,
                    label: 'Quantidade mínima:',
                    value: 0,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                    },
                },
                [`TMPFY_MONSTERITEMS_maxquantity_${index}`]: {
                    type: 'number',
                    name: `maxquantity_TMPFY_MONSTERITEMS_${index}`,
                    label: 'Quantidade máxima:',
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
    
            if (updated.TMPFY_MONSTERITEMS_collective) {
                updated.TMPFY_MONSTERITEMS_collective = {
                    ...updated.TMPFY_MONSTERITEMS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_MONSTERITEMS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryMonsterItemFieldsCounter(oldValue => (oldValue + 1))
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
                register={register}
                setValue={setValue}
                name="aggressive"
                label="É agressivo?"
                errorMessage={errors?.aggressive?.message}
                type="radiobuttons"
                reloadInformation={!isLoadingLateValues}
                doFormLateLoadInformations={doFormLateLoadInformations}
                fontFamily="arial" />

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
                }} />

            <FormattedInput
                name="hp"
                label="Pontos de vida:"
                errorMessage={errors?.hp?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="exp"
                label="Experiencia:"
                errorMessage={errors?.exp?.message}
                type="number"
                step="0.01"
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
                                Habilidades
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
                                            addRecordDescription="Habilidade"
                                            onClick={addMonsterAbilityField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_MONSTERABILITIES_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `monster/${monster.id}/monster_abilities/${group.collectiveId}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_MONSTERABILITIES_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeMonsterAbilityField}
                                    reloadInformation={false}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item>
                        <Accordion.Header targetId="2">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                Itens que Dropam
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
                                            addRecordDescription="Item que Dropa"
                                            onClick={addMonsterItemField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_MONSTERITEMS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${group.collectiveId}/monsters/${monster.id}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_MONSTERITEMS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeMonsterItemField}
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

export default MonsterFormInputs