import React, { Fragment, useState, useEffect } from 'react'
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
    alphabeticFiveHundredStringValidation,
    alphabeticThreeHundredStringValidation,
    idValidation,
    twoMegabytesImageValidation,
    nonNegativeInfiniteIntegerNumber,
    nonNegativeInfiniteFloatNumber,
    booleanValidation,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    MonsterFormInputs,
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

const Update = ({ monster }) => (
    <RecordFormModal
        title="Atualizar Monstro"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, temporaryFields, isOpen, fetchingPayload }) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                image: twoMegabytesImageValidation.optional(),
                icon_id: idValidation.optional(),
                hp: nonNegativeInfiniteIntegerNumber.optional(),
                exp: nonNegativeInfiniteFloatNumber.optional(),
                aggressive: booleanValidation.optional(),
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
                icon_id: 0,
                hp: 0,
                exp: 0,
                aggressive: 0,
            },
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
                icon_id: monster?.icon_id,
                image: monster?.image ? urlToFile(monster.image) : null,
                hp: monster.hp,
                exp: monster.exp,
                aggressive: Number(monster.aggressive),
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
                id: monster.id,
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
                "icon_id",
                "hp",
                "exp",
                "aggressive",
            ],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={MonsterFormInputs}
        inputsComponentExtraProps={{
            monster: monster,
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
                actionRoute: `monsters/${monster.id}/translations`,
            },
            {
                actionMethod: "GET",
                actionRoute: `monsters/${monster.id}/abilities`,
            },
            {
                actionMethod: "GET",
                actionRoute: `item_monsters/by_monster/${monster.id}`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route,
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                const existingModelIds = _.uniq(_.map(data.payload, 'monster_id'))
                const existingLocaleIds = _.map(data.payload, 'locale_id')
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    monster_id: modelIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                })))
                const result = _.concat(data.payload, newRecords)
                return ({ ...result })
            },
            (data) => ({ ...data.accumulatedPayload, monster_abilities: { isNestedMonsterAbilitiesField: true, ...data.payload } }),
            (data) => ({ ...data.accumulatedPayload, monster_items: { isNestedMonsterItemsField: true, ...data.payload } })
        ]}
        fetchingDynamicFieldsHelper={(collective) => {
            if (collective?.isNestedMonsterAbilitiesField) {
                const fieldsToIterate = _.omit(collective, ["isNestedMonsterAbilitiesField"])
                const abilitiesArray = Object.values(fieldsToIterate)
                
                return abilitiesArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_MONSTERABILITIES_collective_${nestedCollective.ability_id}`] = {
                        collectiveName: `Habilidade "${nestedCollective.ability.ability_translation.name}": `,
                        collectiveId: nestedCollective.ability_id,
                        [`NESTEDDYNAMICFIELD_MONSTERABILITIES_ability_id_${nestedCollective.ability_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Habilidade: ',
                            name: `ability_id_NESTEDDYNAMICFIELD_MONSTERABILITIES_${nestedCollective.ability_id}`,
                            value: nestedCollective.ability_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/abilities/search`,
                                defaultValueFetchEndpoint: `abilities`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["ability_translation", "name"],
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERABILITIES_min_${nestedCollective.ability_id}`]: {
                            type: 'number',
                            name: `min_NESTEDDYNAMICFIELD_MONSTERABILITIES_${nestedCollective.ability_id}`,
                            label: 'Minimo:',
                            value: nestedCollective?.min || 0,
                            validation: _.isEmpty(nestedCollective?.min) ? nonNegativeInfiniteIntegerNumber : nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERABILITIES_max_${nestedCollective.ability_id}`]: {
                            type: 'number',
                            name: `max_NESTEDDYNAMICFIELD_MONSTERABILITIES_${nestedCollective.ability_id}`,
                            label: 'Maximo:',
                            value: nestedCollective?.max || 0,
                            validation: _.isEmpty(nestedCollective?.max) ? nonNegativeInfiniteIntegerNumber : nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERABILITIES_duration_${nestedCollective.ability_id}`]: {
                            type: 'number',
                            name: `duration_NESTEDDYNAMICFIELD_MONSTERABILITIES_${nestedCollective.ability_id}`,
                            label: 'Duração:',
                            value: nestedCollective?.duration || 0,
                            validation: _.isEmpty(nestedCollective?.duration) ? nonNegativeInfiniteFloatNumber : nonNegativeInfiniteFloatNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                                step: "0.01",
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERABILITIES_cooldown_${nestedCollective.ability_id}`]: {
                            type: 'number',
                            name: `cooldown_NESTEDDYNAMICFIELD_MONSTERABILITIES_${nestedCollective.ability_id}`,
                            label: 'Recarga:',
                            value: nestedCollective?.cooldown || 0,
                            validation: _.isEmpty(nestedCollective?.cooldown) ? nonNegativeInfiniteFloatNumber : nonNegativeInfiniteFloatNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                                step: "0.01",
                            },
                        },
                    }
                    return acc
                }, {})
            } else if (collective?.isNestedMonsterItemsField) {
                const fieldsToIterate = _.omit(collective, ["isNestedMonsterItemsField"])
                const itemsArray = Object.values(fieldsToIterate)
                
                return itemsArray.reduce((acc, nestedCollective) => {
                    acc[`NESTEDDYNAMICFIELD_MONSTERITEMS_collective_${nestedCollective.item_id}`] = {
                        collectiveName: `Item "${nestedCollective.item.item_translation.name}": `,
                        collectiveId: nestedCollective.item_id,
                        [`NESTEDDYNAMICFIELD_MONSTERITEMS_item_id_${nestedCollective.item_id}`]: {
                            type: 'elasticdropdown',
                            label: 'Item: ',
                            name: `item_id_NESTEDDYNAMICFIELD_MONSTERITEMS_${nestedCollective.item_id}`,
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
                                forbiddenEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/item_monsters/forbidden_items_by_monster?monster_id=${monster.id}`,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERITEMS_minquantity_${nestedCollective.item_id}`]: {
                            type: 'number',
                            name: `minquantity_NESTEDDYNAMICFIELD_MONSTERITEMS_${nestedCollective.item_id}`,
                            label: 'Quantidade mínima:',
                            value: nestedCollective?.minquantity || 0,
                            validation: nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                defaultValue: 0,
                            },
                        },
                        [`NESTEDDYNAMICFIELD_MONSTERITEMS_maxquantity_${nestedCollective.item_id}`]: {
                            type: 'number',
                            name: `maxquantity_NESTEDDYNAMICFIELD_MONSTERITEMS_${nestedCollective.item_id}`,
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
            } else {
                return ({
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
                    },
                })
            }
        }}
        light={true} />
)

export default Update