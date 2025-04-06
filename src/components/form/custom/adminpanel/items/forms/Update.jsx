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
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                // Encontrar os `ids` únicos existentes na lista de resultado do modelo em questao
                const existingModelIds = _.uniq(_.map(data.payload, 'item_id'))

                // Encontrar os locale_ids já presentes no modelo em questao
                const existingLocaleIds = _.map(data.payload, 'locale_id')

                // Filtrar os idiomas que ainda não estão no ícone
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))

                // Criar novos objetos vazios para os ids ausentes e adicionar à lista
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
                }))
                )

                // Atualizar a lista de resultado do modelo em questao com os novos registros
                const result = _.concat(data.payload, newRecords)

                return ({ ...result })
            }
        ]}
        fetchingDynamicFieldsHelper={(collective) => ({
            [`DIFY_collective_${collective.locale.id}`]: {
                collectiveName: collective.locale.name,
                [`DIFY_locale_id_${collective.locale.id}`]: {
                    type: undefined,
                    label: '',
                    name: `locale_id_DIFY_${collective.locale.id}`,
                    value: collective.locale.id,
                    validation: undefined,
                },
                [`DIFY_name_${collective.locale.id}`]: {
                    type: 'text',
                    name: `name_DIFY_${collective.locale.id}`,
                    label: 'Nome:',
                    value: collective.name,
                    validation: _.isEmpty(collective.name) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                },
                [`DIFY_description_${collective.locale.id}`]: {
                    type: 'textarea',
                    name: `description_DIFY_${collective.locale.id}`,
                    label: 'Descrição:',
                    value: collective.description,
                    validation: _.isEmpty(collective.description) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                },
                [`DIFY_attributesinfo_${collective.locale.id}`]: {
                    type: 'textarea',
                    name: `attributesinfo_DIFY_${collective.locale.id}`,
                    label: 'Informações de Atributos:',
                    value: collective.attributesinfo,
                    validation: _.isEmpty(collective.attributesinfo) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                },
                [`DIFY_notes_${collective.locale.id}`]: {
                    type: 'textarea',
                    name: `notes_DIFY_${collective.locale.id}`,
                    label: 'Notas:',
                    value: collective.notes,
                    validation: _.isEmpty(collective.notes) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                },
            },
        })}
        light={true}
    />
)

export default Update 