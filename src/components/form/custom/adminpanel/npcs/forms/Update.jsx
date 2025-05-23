import React, { Fragment, useState, useEffect } from 'react'
import z from 'zod'
import _ from 'lodash'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import { urlToFile } from 'util/image'
import { formatToHourMinute } from 'util/intl'
import {
    extractValuesByExactKeyNameIntoArray,
    extractIntoFlatObjectFieldsByName,
    extractFromNestedObjectByFilters,
    mergeFieldArraysByKeys,
} from 'util/json'

import {
    alphabeticFiveHundredStringValidation,
    alphabeticThreeHundredStringValidation,
    idValidation,
    twoMegabytesImageValidation,
    timeValidation,
    nonNegativeInfiniteFloatNumber,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    NpcFormInputs,
    RecordFormModal,
} from 'components'

const EditRecordButton = ({ animationName = "recordEditAnimation", animatedBackgroundColor = "#FFFA85", ...props }) => (
    <Button
        color="white"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: `${animationName} 0.5s linear 0s infinite alternate`,
                corpse: `@keyframes ${animationName} {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${animatedBackgroundColor}; border-radius: 8px}
                }`
            }
        }}
        {...props}
    >
        <Icon icon={faPen} />
    </Button>
)

const Update = ({ npc }) => (
    <RecordFormModal
        title="Atualizar Npc"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, temporaryFields, isOpen, fetchingPayload }) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                icon_id: idValidation.optional(),
                image: twoMegabytesImageValidation.optional(),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    maxDepth: 3,
                }),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: temporaryFields,
                }),
            }),
            validationSchema: z.object({}),
            defaultValues: {
                icon_id: 0,
                image: null,
            },            
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
                icon_id: npc.icon_id,
                image: npc?.image ? urlToFile(npc.image) : null,
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj.type !== undefined)
                            return true
                        return false
                    },
                    maxDepth: 3,
                }),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: temporaryFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj?.type !== undefined)
                            return true
                        return false
                    },
                    maxDepth: 3,
                }),
            }),
            additionalSubmitValues: ({
                id: npc.id,
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj?.name?.includes("id"))
                            return true
                        return false
                    },
                }),
                ...mergeFieldArraysByKeys(
                    [
                        extractFromNestedObjectByFilters({
                            initialData: dynamicFields,
                            filters: [
                                (field) => field.isPersistedRecord === true,
                                (field) => field.isPersistedRecord === false
                            ],
                            filtersNamings: [
                                "persisted",
                                "non_persisted"
                            ],
                            comparisonField: 'name',
                            maxDepth: 3,
                        }),
                        extractFromNestedObjectByFilters({
                            initialData: temporaryFields,
                            filters: [
                                (field) => field.isPersistedRecord === true,
                                (field) => field.isPersistedRecord === false
                            ],
                            filtersNamings: [
                                "persisted",
                                "non_persisted"
                            ],
                            comparisonField: 'name',
                        }),
                    ],
                    [
                        "persisted",
                        "non_persisted"
                    ]
                )
            }),
            additionalAllowedProperties: [
                ...extractValuesByExactKeyNameIntoArray(dynamicFields, "name", 3),
                ...extractValuesByExactKeyNameIntoArray(temporaryFields, "name", 3),
                "persisted",
                "non_persisted",
                "id",
                "image",
                "icon_id",
            ],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={NpcFormInputs}
        inputsComponentExtraProps={{
            npc: npc,
            displayTemporaryFields: true,
        }}
        submitButtonProps={{
            color: "white",
            animationBackgroundColor: "#FFFA85",
            animationName: "recordEditSubmitAnimation",
            value: "Alterar",
        }}
        fetchDynamicFields={true}
        fetchingRequests={[
            {
                actionMethod: "GET",
                actionRoute: `locales/all/*`,
            },
            {
                actionMethod: "GET",
                actionRoute: `npcs/${npc.id}/translations`,
            },
            {
                actionMethod: "GET",
                actionRoute: `locations_npcs/?npc_id=${npc.id}`,
            },
            {
                actionMethod: "GET",
                actionRoute: `item_npc_buys/by_npc/${npc.id}`,
            },
            {
                actionMethod: "GET",
                actionRoute: `item_npc_sells/by_npc/${npc.id}`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                const existingModelIds = _.uniq(_.map(data.payload, 'npc_id'))
                const existingLocaleIds = _.map(data.payload, 'locale_id')
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    npc_id: modelIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    description: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                })))
                const result = _.concat(data.payload, newRecords)
                return ({ ...result })
            },
            (data) => ({ ...data.accumulatedPayload, locations: { isNestedLocationField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, item_buys: { isNestedItemBuysField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, item_sells: { isNestedItemSellsField: true, ...data.payload } })
        ]}
        fetchingDynamicFieldsHelper={(collective) => {
            if (collective?.isNestedLocationField) {
                const fieldsToIterate = _.omit(collective, ["isNestedLocationField"])
                const locationsArray = Object.values(fieldsToIterate)
                
                return locationsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_LOCATIONS_collective_${nestedCollective.location_id}`] = {
                        collectiveName: `Local "${nestedCollective.location.location_translation.name}": `,
                        collectiveId: nestedCollective.location_id,
                        [`NESTEDDYNAMICFIELD_LOCATIONS_location_id_${nestedCollective.location_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Local: ',
                            name: `location_id_NESTEDDYNAMICFIELD_LOCATIONS_${nestedCollective.location_id}`,
                            value: nestedCollective.location_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/locations/search`,
                                defaultValueFetchEndpoint: `locations`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["location_translation", "name"],
                            },
                        },
                        [`NESTEDDYNAMICFIELD_LOCATIONS_visit_at_${nestedCollective.location_id}`]: {
                            type: 'time',
                            name: `visit_at_NESTEDDYNAMICFIELD_LOCATIONS_${nestedCollective.location_id}`,
                            label: 'Aparece às:',
                            value: formatToHourMinute(nestedCollective.visit_at),
                            validation: _.isEmpty(nestedCollective.visit_at) ? timeValidation : timeValidation.optional(),
                            isPersistedRecord: true,
                        },
                    }
                    return acc
                }, {})
            }
            else if (collective?.isNestedItemBuysField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemBuysField"])
                const itemsArray = Object.values(fieldsToIterate)
                
                return itemsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMBUYS_collective_${nestedCollective.item_id}`] = {
                        collectiveName: `Item "${nestedCollective.item.item_translation.name}": `,
                        collectiveId: nestedCollective.item_id,
                        [`NESTEDDYNAMICFIELD_ITEMBUYS_item_id_${nestedCollective.item_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Item: ',
                            name: `item_id_NESTEDDYNAMICFIELD_ITEMBUYS_${nestedCollective.item_id}`,
                            value: nestedCollective.item_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/items/search`,
                                defaultValueFetchEndpoint: `items`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["item_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_buys/forbidden_items_by_npc?npc_id=${npc.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMBUYS_value_${nestedCollective.item_id}`]: {
                            type: 'number',
                            name: `value_NESTEDDYNAMICFIELD_ITEMBUYS_${nestedCollective.item_id}`,
                            label: 'Valor:',
                            value: nestedCollective.value,
                            validation: nonNegativeInfiniteFloatNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                    }
                    return acc
                }, {})
            }
            else if (collective?.isNestedItemSellsField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemSellsField"])
                const itemsArray = Object.values(fieldsToIterate)
                
                return itemsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMSELLS_collective_${nestedCollective.item_id}`] = {
                        collectiveName: `Item "${nestedCollective.item.item_translation.name}": `,
                        collectiveId: nestedCollective.item_id,
                        [`NESTEDDYNAMICFIELD_ITEMSELLS_item_id_${nestedCollective.item_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Item: ',
                            name: `item_id_NESTEDDYNAMICFIELD_ITEMSELLS_${nestedCollective.item_id}`,
                            value: nestedCollective.item_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/items/search`,
                                defaultValueFetchEndpoint: `items`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["item_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_sells/forbidden_items_by_npc?npc_id=${npc.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMSELLS_value_${nestedCollective.item_id}`]: {
                            type: 'number',
                            name: `value_NESTEDDYNAMICFIELD_ITEMSELLS_${nestedCollective.item_id}`,
                            label: 'Valor:',
                            value: nestedCollective.value,
                            validation: nonNegativeInfiniteFloatNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                    }
                    return acc
                }, {})
            }
            else {
                return {
                    [`DIFY_collective_${collective.composite_id}`]: {
                        collectiveName: collective.locale.name,
                        [`DIFY_locale_id_${collective.locale_id}`]: {
                            type: undefined,
                            label: '',
                            name: `locale_id_DIFY_${collective.locale_id}`,
                            value: collective.locale_id,
                            validation: undefined,
                            isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                        },
                        [`DIFY_name_${collective.locale_id}`]: {
                            type: 'text',
                            name: `name_DIFY_${collective.locale_id}`,
                            label: 'Nome:',
                            value: collective.name,
                            validation: _.isEmpty(collective.name) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                            isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                        },
                        [`DIFY_description_${collective.locale_id}`]: {
                            type: 'textarea',
                            name: `description_DIFY_${collective.locale_id}`,
                            label: 'Descrição:',
                            value: collective.description,
                            validation: _.isEmpty(collective.description) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                            isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                        },
                    },
                }
            }
        }}
        light={true} />
)

export default Update