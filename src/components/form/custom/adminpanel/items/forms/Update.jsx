import React from 'react'
import z from 'zod'
import _ from 'lodash'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import { urlToFile } from 'util/image'

import {
    extractValuesByExactKeyNameIntoArray,
    extractIntoFlatObjectFieldsByName,
    extractFromNestedObjectByFilters,
    mergeFieldArraysByKeys,
} from 'util/json'

import {
    nonNegativeInfiniteFloatNumber,
    nonNegativeInfiniteIntegerNumber,
    idValidation,
    twoMegabytesImageValidation,
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button,
    Icon,
    ItemFormInputs,
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

const Update = ({ item }) => (
    <RecordFormModal
        title="Atualizar Item"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, temporaryFields, isOpen, fetchingPayload }) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                image: twoMegabytesImageValidation.optional(),
                item_category_id: idValidation.optional(),
                maxstack: nonNegativeInfiniteIntegerNumber.optional(),
                weight: nonNegativeInfiniteFloatNumber.optional(),
                armor: nonNegativeInfiniteIntegerNumber.optional(),
                damage: nonNegativeInfiniteIntegerNumber.optional(),
                attackspeed: nonNegativeInfiniteIntegerNumber.optional(),
                range: nonNegativeInfiniteIntegerNumber.optional(),
                defense: nonNegativeInfiniteIntegerNumber.optional(),
                size: nonNegativeInfiniteIntegerNumber.optional(),
                slots: nonNegativeInfiniteIntegerNumber.optional(),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    maxDepth: 4
                }),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: temporaryFields,
                    maxDepth: 4,
                }),
            }),
            validationSchema: z.object({}),
            defaultValues: {
                image: null,
                item_category_id: 0,
                maxstack: 1,
                weight: 0,
                armor: 0,
                damage: 0,
                attackspeed: 0,
                range: 0,
                defense: 0,
                size: 0,
                slots: 0,
            },
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
                item_category_id: item?.item_category_id,
                image: item?.image ? urlToFile(item.image) : null,
                maxstack: item.maxstack,
                weight: item.weight,
                armor: item.armor,
                damage: item.damage,
                attackspeed: item.attackspeed,
                range: item.range,
                defense: item.defense,
                size: item.size,
                slots: item.slots,
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
                    maxDepth: 4,
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
                    maxDepth: 4,
                }),
            }),
            additionalSubmitValues: ({
                id: item.id,
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
                            maxDepth: 4,
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
                            maxDepth: 4,
                        }),
                    ],
                    [
                        "persisted",
                        "non_persisted"
                    ]
                )
            }),
            additionalAllowedProperties: [
                ...extractValuesByExactKeyNameIntoArray(dynamicFields, "name", 4),
                ...extractValuesByExactKeyNameIntoArray(temporaryFields, "name", 4),
                "persisted",
                "non_persisted",
                "id",
                "image",
                "item_category_id",
                "maxstack",
                "weight",
                "armor",
                "damage",
                "attackspeed",
                "range",
                "defense",
                "size",
                "slots",
            ],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={ItemFormInputs}
        inputsComponentExtraProps={{
            item: item,
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
                actionRoute: `items/${item.id}/translations`,
            },
            {
                actionMethod: "GET",
                actionRoute: `items/${item.id}/quests`,
            },
            {
                actionMethod: "GET",
                actionRoute: `items/${item.id}/monsters`,
            },
            {
                actionMethod: "GET",
                actionRoute: `items/${item.id}/npcs_buy`,
            },
            {
                actionMethod: "GET",
                actionRoute: `items/${item.id}/npcs_sell`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                const existingModelIds = _.uniq(_.map(data.payload, 'item_id'))
                const existingLocaleIds = _.map(data.payload, 'locale_id')
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    item_id: modelIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    description: "",
                    attributesinfo: "",
                    notes: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                })))
                const result = _.concat(data.payload, newRecords)
                return ({ ...result })
            },
            (data) => ({ ...data.accumulatedPayload, item_quests: { isNestedItemQuestsField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, item_monsters: { isNestedItemMonstersField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, item_npc_buys: { isNestedItemNpcBuysField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, item_npc_sells: { isNestedItemNpcSellsField: true, ...data.payload } })
        ]}
        fetchingDynamicFieldsHelper={(collective) => {
            if (collective?.isNestedItemQuestsField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemQuestsField"])
                const questsArray = Object.values(fieldsToIterate)
                
                return questsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMQUESTS_collective_${nestedCollective.quest_id}`] = {
                        collectiveName: `Quest "${nestedCollective.quest.quest_translation.name}": `,
                        collectiveId: nestedCollective.quest_id,
                        [`NESTEDDYNAMICFIELD_ITEMQUESTS_quest_id_${nestedCollective.quest_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Quest: ',
                            name: `quest_id_NESTEDDYNAMICFIELD_ITEMQUESTS_${nestedCollective.quest_id}`,
                            value: nestedCollective.quest_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/quests/search`,
                                defaultValueFetchEndpoint: `quests`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["quest_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_quests/forbidden_quests_by_item?item_id=${item.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMQUESTS_quantity_${nestedCollective.quest_id}`]: {
                            type: 'number',
                            name: `quantity_NESTEDDYNAMICFIELD_ITEMQUESTS_${nestedCollective.quest_id}`,
                            label: 'Quantidade:',
                            value: nestedCollective?.quantity || 0,
                            validation: nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                    }
                    return acc
                }, {})
            }

            if (collective?.isNestedItemMonstersField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemMonstersField"])
                const monstersArray = Object.values(fieldsToIterate)
                
                return monstersArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMMONSTERS_collective_${nestedCollective.monster_id}`] = {
                        collectiveName: `Monstro "${nestedCollective.monster.monster_translation.name}": `,
                        collectiveId: nestedCollective.monster_id,
                        [`NESTEDDYNAMICFIELD_ITEMMONSTERS_monster_id_${nestedCollective.monster_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Monstro: ',
                            name: `monster_id_NESTEDDYNAMICFIELD_ITEMMONSTERS_${nestedCollective.monster_id}`,
                            value: nestedCollective.monster_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/monsters/search`,
                                defaultValueFetchEndpoint: `monsters`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["monster_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_monsters/forbidden_monsters_by_item?item_id=${item.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMMONSTERS_minquantity_${nestedCollective.monster_id}`]: {
                            type: 'number',
                            name: `minquantity_NESTEDDYNAMICFIELD_ITEMMONSTERS_${nestedCollective.monster_id}`,
                            label: 'Quantidade mínima:',
                            value: nestedCollective?.minquantity || 0,
                            validation: nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMMONSTERS_maxquantity_${nestedCollective.monster_id}`]: {
                            type: 'number',
                            name: `maxquantity_NESTEDDYNAMICFIELD_ITEMMONSTERS_${nestedCollective.monster_id}`,
                            label: 'Quantidade máxima:',
                            value: nestedCollective?.maxquantity || 0,
                            validation: nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                    }
                    return acc
                }, {})
            }

            if (collective?.isNestedItemNpcBuysField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemNpcBuysField"])
                const npcsArray = Object.values(fieldsToIterate)
                
                return npcsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMNPCBUYS_collective_${nestedCollective.npc_id}`] = {
                        collectiveName: `NPC comprador "${nestedCollective.npc.npc_translation.name}": `,
                        collectiveId: nestedCollective.npc_id,
                        [`NESTEDDYNAMICFIELD_ITEMNPCBUYS_npc_id_${nestedCollective.npc_id}`]: {
                            type: 'elasticdropdown',
                            label: 'NPC: ',
                            name: `npc_id_NESTEDDYNAMICFIELD_ITEMNPCBUYS_${nestedCollective.npc_id}`,
                            value: nestedCollective.npc_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/npcs/search`,
                                defaultValueFetchEndpoint: `npcs`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["npc_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_buys/forbidden_npcs_by_item?item_id=${item.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMNPCBUYS_value_${nestedCollective.npc_id}`]: {
                            type: 'number',
                            name: `value_NESTEDDYNAMICFIELD_ITEMNPCBUYS_${nestedCollective.npc_id}`,
                            label: 'Valor:',
                            value: nestedCollective?.value || 0,
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

            if (collective?.isNestedItemNpcSellsField) {
                const fieldsToIterate = _.omit(collective, ["isNestedItemNpcSellsField"])
                const npcsArray = Object.values(fieldsToIterate)
                
                return npcsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_ITEMNPCSELLS_collective_${nestedCollective.npc_id}`] = {
                        collectiveName: `NPC vendedor "${nestedCollective.npc.npc_translation.name}": `,
                        collectiveId: nestedCollective.npc_id,
                        [`NESTEDDYNAMICFIELD_ITEMNPCSELLS_npc_id_${nestedCollective.npc_id}`]: {
                            type: 'elasticdropdown',
                            label: 'NPC: ',
                            name: `npc_id_NESTEDDYNAMICFIELD_ITEMNPCSELLS_${nestedCollective.npc_id}`,
                            value: nestedCollective.npc_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/npcs/search`,
                                defaultValueFetchEndpoint: `npcs`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["npc_translation", "name"],
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_npc_sells/forbidden_npcs_by_item?item_id=${item.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_ITEMNPCSELLS_value_${nestedCollective.npc_id}`]: {
                            type: 'number',
                            name: `value_NESTEDDYNAMICFIELD_ITEMNPCSELLS_${nestedCollective.npc_id}`,
                            label: 'Valor:',
                            value: nestedCollective?.value || 0,
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
                        value: collective.name || '',
                        validation: _.isEmpty(collective.name) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                        isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                    },
                    [`DIFY_description_${collective.locale_id}`]: {
                        type: 'textarea',
                        name: `description_DIFY_${collective.locale_id}`,
                        label: 'Descrição:',
                        value: collective.description || '',
                        validation: _.isEmpty(collective.description) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                        isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                    },
                    [`DIFY_attributesinfo_${collective.locale_id}`]: {
                        type: 'textarea',
                        name: `attributesinfo_DIFY_${collective.locale_id}`,
                        label: 'Informações de Atributos:',
                        value: collective.attributesinfo || '',
                        validation: _.isEmpty(collective.attributesinfo) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                        isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                    },
                    [`DIFY_notes_${collective.locale_id}`]: {
                        type: 'textarea',
                        name: `notes_DIFY_${collective.locale_id}`,
                        label: 'Notas:',
                        value: collective.notes || '',
                        validation: _.isEmpty(collective.notes) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                        isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                    },
                },
            }
        }}
        light={true}
    />
)

export default Update