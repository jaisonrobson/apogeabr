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

    const addItemQuestField = () => {
        const index = temporaryItemQuestFieldsCounter

        const newFields = {
            [`TMPFY_collective_${index}`]: {
                collectiveName: `Nova recompensa de quest +${index}:`,
                collectiveId: index,
                [`TMPFY_ITEMQUESTS_quest_id_${index}`]: {
                    type: 'elasticdropdown',
                    name: `quest_id_TMPFY_${index}`,
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
                    },
                },
                [`TMPFY_ITEMQUESTS_quantity_${index}`]: {
                    type: 'number',
                    name: `quantity_TMPFY_${index}`,
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
                </Accordion>
            )}
        </Fragment>
    )
}

export default ItemFormInputs 