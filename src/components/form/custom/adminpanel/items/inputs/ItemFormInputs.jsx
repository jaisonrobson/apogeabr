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

const ItemFormInputs = ({
    register,
    errors,
    backendErrors,
    setValue,
    item,
    doFormLateLoadInformations,
    isLoadingLateValues=false,
    displayTemporaryFields=false,
    dynamicFields={},
    setTemporaryFields,
    temporaryFields={},
    light=false,
    ...props
}) => {
    const { locales } = useRouteLoaderData("adminpanel_library")
    const { value: { getValues } } = useFormContext()
    const { setSnapshot } = useContext(FormDataContext)
    const [ temporaryItemQuestFieldsCounter, setTemporaryItemQuestFieldsCounter ] = useState(1)
    const [ temporaryItemMonsterFieldsCounter, setTemporaryItemMonsterFieldsCounter ] = useState(1)
    const [ temporaryItemNpcBuyFieldsCounter, setTemporaryItemNpcBuyFieldsCounter ] = useState(1)
    const [ temporaryItemNpcSellFieldsCounter, setTemporaryItemNpcSellFieldsCounter ] = useState(1)

    const removeItemQuestField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_ITEMQUESTS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_ITEMQUESTS_collective: filtered
            }
        })
    }

    const removeItemMonsterField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_ITEMMONSTERS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_ITEMMONSTERS_collective: filtered
            }
        })
    }

    const removeItemNpcBuyField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_ITEMNPCBUYS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_ITEMNPCBUYS_collective: filtered
            }
        })
    }

    const removeItemNpcSellField = (collectiveIdToRemove) => {
        setTemporaryFields(oldFields => {
            const collective = oldFields.TMPFY_ITEMNPCSELLS_collective || {}
    
            const filtered = _.omitBy(collective, value => value.collectiveId === collectiveIdToRemove)
    
            return {
                ...oldFields,
                TMPFY_ITEMNPCSELLS_collective: filtered
            }
        })
    }

    const addItemQuestField = () => {
        const index = temporaryItemQuestFieldsCounter

        const newFields = {
            [`TMPFY_ITEMQUESTS_collective_${index}`]: {
                collectiveName: `Nova recompensa de quest +${index}:`,
                collectiveId: index,
                [`TMPFY_ITEMQUESTS_quest_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `quest_id_TMPFY_ITEMQUESTS_${index}`,
                    label: 'Quest:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/quests/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["quest_translation", "name"],
                        defaultValueFetchEndpoint: `quests`,
                        defaultValueResponsePayloadPath: ["data"],
                        forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_quests/forbidden_quests_by_item?item_id=${item.id}`,
                    },
                },
                [`TMPFY_ITEMQUESTS_quantity_${index}`]: {
                    type: 'number',
                    name: `quantity_TMPFY_ITEMQUESTS_${index}`,
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
    
            if (updated.TMPFY_ITEMQUESTS_collective) {
                updated.TMPFY_ITEMQUESTS_collective = {
                    ...updated.TMPFY_ITEMQUESTS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_ITEMQUESTS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryItemQuestFieldsCounter(oldValue => (oldValue + 1))
    }

    const addItemMonsterField = () => {
        const index = temporaryItemMonsterFieldsCounter

        const newFields = {
            [`TMPFY_ITEMMONSTERS_collective_${index}`]: {
                collectiveName: `Novo monstro +${index}:`,
                collectiveId: index,
                [`TMPFY_ITEMMONSTERS_monster_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `monster_id_TMPFY_ITEMMONSTERS_${index}`,
                    label: 'Monstro:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/monsters/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["monster_translation", "name"],
                        defaultValueFetchEndpoint: `monsters`,
                        defaultValueResponsePayloadPath: ["data"],
                        forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_monsters/forbidden_monsters_by_item?item_id=${item.id}`,
                    },
                },
                [`TMPFY_ITEMMONSTERS_minquantity_${index}`]: {
                    type: 'number',
                    name: `minquantity_TMPFY_ITEMMONSTERS_${index}`,
                    label: 'Quantidade mínima:',
                    value: 0,
                    validation: nonNegativeInfiniteIntegerNumber,
                    isPersistedRecord: false,
                    extraProperties: {
                        defaultValue: 0,
                    },
                },
                [`TMPFY_ITEMMONSTERS_maxquantity_${index}`]: {
                    type: 'number',
                    name: `maxquantity_TMPFY_ITEMMONSTERS_${index}`,
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
    
            if (updated.TMPFY_ITEMMONSTERS_collective) {
                updated.TMPFY_ITEMMONSTERS_collective = {
                    ...updated.TMPFY_ITEMMONSTERS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_ITEMMONSTERS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryItemMonsterFieldsCounter(oldValue => (oldValue + 1))
    }

    const addItemNpcBuyField = () => {
        const index = temporaryItemNpcBuyFieldsCounter

        const newFields = {
            [`TMPFY_ITEMNPCBUYS_collective_${index}`]: {
                collectiveName: `Novo NPC comprador +${index}:`,
                collectiveId: index,
                [`TMPFY_ITEMNPCBUYS_npc_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `npc_id_TMPFY_ITEMNPCBUYS_${index}`,
                    label: 'NPC:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/npcs/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["npc_translation", "name"],
                        defaultValueFetchEndpoint: `npcs`,
                        defaultValueResponsePayloadPath: ["data"],
                        forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_buys/forbidden_npcs_by_item?item_id=${item.id}`,
                    },
                },
                [`TMPFY_ITEMNPCBUYS_value_${index}`]: {
                    type: 'number',
                    name: `value_TMPFY_ITEMNPCBUYS_${index}`,
                    label: 'Valor:',
                    value: 0,
                    validation: nonNegativeInfiniteFloatNumber,
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
    
            if (updated.TMPFY_ITEMNPCBUYS_collective) {
                updated.TMPFY_ITEMNPCBUYS_collective = {
                    ...updated.TMPFY_ITEMNPCBUYS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_ITEMNPCBUYS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryItemNpcBuyFieldsCounter(oldValue => (oldValue + 1))
    }

    const addItemNpcSellField = () => {
        const index = temporaryItemNpcSellFieldsCounter

        const newFields = {
            [`TMPFY_ITEMNPCSELLS_collective_${index}`]: {
                collectiveName: `Novo NPC vendedor +${index}:`,
                collectiveId: index,
                [`TMPFY_ITEMNPCSELLS_npc_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `npc_id_TMPFY_ITEMNPCSELLS_${index}`,
                    label: 'NPC:',
                    value: 0,
                    validation: idValidation,
                    isPersistedRecord: false,
                    extraProperties: {
                        togglerProperties: {
                            color: 'white'
                        },
                        searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/npcs/search`,
                        searchPayloadIdPath: ["id"],
                        searchPayloadNamePath: ["npc_translation", "name"],
                        defaultValueFetchEndpoint: `npcs`,
                        defaultValueResponsePayloadPath: ["data"],
                        forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_sells/forbidden_npcs_by_item?item_id=${item.id}`,
                    },
                },
                [`TMPFY_ITEMNPCSELLS_value_${index}`]: {
                    type: 'number',
                    name: `value_TMPFY_ITEMNPCSELLS_${index}`,
                    label: 'Valor:',
                    value: 0,
                    validation: nonNegativeInfiniteFloatNumber,
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
    
            if (updated.TMPFY_ITEMNPCSELLS_collective) {
                updated.TMPFY_ITEMNPCSELLS_collective = {
                    ...updated.TMPFY_ITEMNPCSELLS_collective,
                    ...newFields,
                }
            } else {
                updated.TMPFY_ITEMNPCSELLS_collective = {
                    ...newFields,
                }
            }
    
            return updated
        })

        setTemporaryItemNpcSellFieldsCounter(oldValue => (oldValue + 1))
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
                }} />

            <FormattedInput
                name="maxstack"
                label="Empilhamento máximo:"
                errorMessage={errors?.maxstack?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="weight"
                label="Peso:"
                errorMessage={errors?.weight?.message}
                type="number"
                step="0.01"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="armor"
                label="Armadura:"
                errorMessage={errors?.armor?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="damage"
                label="Dano:"
                errorMessage={errors?.damage?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="attackspeed"
                label="Velocidade de ataque:"
                errorMessage={errors?.attackspeed?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="range"
                label="Alcance:"
                errorMessage={errors?.range?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="defense"
                label="Defesa:"
                errorMessage={errors?.defense?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="size"
                label="Tamanho:"
                errorMessage={errors?.size?.message}
                type="number"
                fontFamily="arial"
                register={register}
                setValue={setValue} />

            <FormattedInput
                name="slots"
                label="Slots:"
                errorMessage={errors?.slots?.message}
                type="number"
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
                                Recompensa de Quest
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
                                            addRecordDescription="Recompensa de Quest"
                                            onClick={addItemQuestField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_ITEMQUESTS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${item.id}/quests/${group.collectiveId}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_ITEMQUESTS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeItemQuestField}
                                    reloadInformation={false}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item>
                        <Accordion.Header targetId="2">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                Monstros que Dropam
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
                                            addRecordDescription="Monstro que Dropa"
                                            onClick={addItemMonsterField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_ITEMMONSTERS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${item.id}/monsters/${group.collectiveId}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_ITEMMONSTERS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeItemMonsterField}
                                    reloadInformation={false}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item>
                        <Accordion.Header targetId="3">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                NPCs que Compram
                            </Span>
                        </Accordion.Header>

                        <Accordion.Body accordionId="3">
                            <Row>
                                <Row padding="0px" margin="0px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <Row>
                                    <Col>
                                        <AddDynamicRecordButton
                                            addRecordDescription="NPC que Compra"
                                            onClick={addItemNpcBuyField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_ITEMNPCBUYS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${item.id}/npcs_buy/${group.collectiveId}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_ITEMNPCBUYS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeItemNpcBuyField}
                                    reloadInformation={false}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    collectiveInputsSearchDepth={2} />
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item>
                        <Accordion.Header targetId="4">
                            <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                NPCs que Vendem
                            </Span>
                        </Accordion.Header>

                        <Accordion.Body accordionId="4">
                            <Row>
                                <Row padding="0px" margin="0px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <Row>
                                    <Col>
                                        <AddDynamicRecordButton
                                            addRecordDescription="NPC que Vende"
                                            onClick={addItemNpcSellField} />
                                    </Col>
                                </Row>

                                <Row padding="0px" margin="0px" marginTop="15px">
                                    <HR light={!light} height="2px" />
                                </Row>

                                <RenderCollectiveInputs
                                    extractCollectives="NESTEDDYNAMICFIELD_ITEMNPCSELLS_collective"
                                    collectiveInputsSearchDepth={2}
                                    collectiveInputs={dynamicFields}
                                    register={register}
                                    errors={errors}
                                    light={light}
                                    setValue={setValue}
                                    reloadInformation={!isLoadingLateValues}
                                    doFormLateLoadInformations={doFormLateLoadInformations}
                                    deleteEndpoint={(group) => `items/${item.id}/npcs_sell/${group.collectiveId}`} />

                                <RenderCollectiveInputs
                                    collectiveKeyPath={["TMPFY_ITEMNPCSELLS_collective"]}
                                    collectiveInputs={temporaryFields}
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    light={light}
                                    onRemoveCollectiveInputs={removeItemNpcSellField}
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

export default ItemFormInputs 