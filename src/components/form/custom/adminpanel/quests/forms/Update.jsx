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
    youtubeLinkValidation,
    nonNegativeInfiniteIntegerNumber,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    QuestFormInputs,
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

const Update = ({ quest }) => (
    <RecordFormModal
        title="Atualizar Missão"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, temporaryFields, isOpen, fetchingPayload }) => {

            return ({
                action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS_UPDATE_SUBMIT.path,
                onlyTouchedFields: true,
                externalSchema: z.object({
                    video_link: youtubeLinkValidation.optional(),
                    image: twoMegabytesImageValidation.optional(),
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
                    video_link: "",
                    image: null,
                },
                lateLoadingProps: { isOpen },
                lateLoadingTriggers: [{ isOpen: true }],
                lateLoadingValues: () => ({
                    video_link: quest.video_link,
                    image: quest?.image ? urlToFile(quest.image) : null,
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
                    id: quest.id,
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
                    ..._.pickBy(
                        extractIntoFlatObjectFieldsByName({
                            initialData: dynamicFields,
                            byName: "name",
                            fieldName: "value",
                            validateFields: false,
                            validationFunction: (obj) => {
                                if (obj?.name?.includes("id"))
                                    return true
                                return false
                            },
                            maxDepth: 4,
                        }),
                        (value, key) => /^locale_id_NESTEDDYNAMICFIELD_\d+_QUESTSTEPS_TRANSLATION_\d+$/.test(key)
                    ),
                    ..._.pickBy(
                        extractIntoFlatObjectFieldsByName({
                            initialData: temporaryFields,
                            byName: "name",
                            fieldName: "value",
                            validateFields: false,
                            validationFunction: (obj) => {
                                if (obj?.name?.includes("id"))
                                    return true
                                return false
                            },
                            maxDepth: 4,
                        }),
                        (value, key) => /^locale_id_TMPFY_\d+_QUESTSTEPS_TRANSLATION_\d+$/.test(key)
                    ),
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
                    "video_link",
                ],
                additionalEnforcedProperties: ["id"]
            })
        }}
        inputsComponent={QuestFormInputs}
        inputsComponentExtraProps={{
            quest: quest,
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
                actionRoute: `quests/${quest.id}/translations`,
            },
            {
                actionMethod: "GET",
                actionRoute: `quests/${quest.id}/quest_steps/full_index`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                // Encontrar os `ids` únicos existentes na lista de resultado do modelo em questao
                const existingModelIds = _.uniq(_.map(data.payload, 'quest_id'))

                // Encontrar os locale_ids já presentes no modelo em questao
                const existingLocaleIds = _.map(data.payload, 'locale_id')

                // Filtrar os idiomas que ainda não estão no ícone
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))

                // Criar novos objetos vazios para os ids ausentes e adicionar à lista
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    quest_id: modelIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                }))
                )

                // Atualizar a lista de resultado do modelo em questao com os novos registros
                const result = _.concat(data.payload, newRecords)

                return ({ ...result })
            },
            (data) => ({ ...data.accumulatedPayload, quest_steps: { isNestedQuestStepsField: true, ...data.payload } })
        ]}
        fetchingDynamicFieldsHelper={(collective) => {
            if (collective?.isNestedQuestStepsField) {
                const fieldsToIterate = _.omit(collective, ["isNestedQuestStepsField"])

                return _.map(fieldsToIterate, (nestedCollective, key) => ({
                    [`NESTEDDYNAMICFIELD_QUESTSTEPS_collective_${nestedCollective.id}`]: {
                        collectiveName: `Passo "${nestedCollective.order_number}": `,
                        [`NESTEDDYNAMICFIELD_QUESTSTEPS_order_number_${nestedCollective.id}`]: {
                            type: 'number',
                            name: `order_number_NESTEDDYNAMICFIELD_QUESTSTEPS_${nestedCollective.id}`,
                            label: 'Ordem:',
                            value: nestedCollective.order_number,
                            validation: nonNegativeInfiniteIntegerNumber.optional(),
                            isPersistedRecord: true,
                        },
                        [`NESTEDDYNAMICFIELD_QUESTSTEPS_location_id_${nestedCollective.id}`]: {
                            type: 'elasticdropdown',
                            label: 'Local: ',
                            name: `location_id_NESTEDDYNAMICFIELD_QUESTSTEPS_${nestedCollective.id}`,
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
                        [`NESTEDDYNAMICFIELD_QUESTSTEPS_icon_id_${nestedCollective.id}`]: {
                            type: 'elasticdropdown',
                            label: 'Icone: ',
                            name: `icon_id_NESTEDDYNAMICFIELD_QUESTSTEPS_${nestedCollective.id}`,
                            value: nestedCollective.icon_id,
                            validation: idValidation.optional(),
                            isPersistedRecord: true,
                            extraProperties: {
                                togglerProperties: {
                                    color: 'white'
                                },
                                searchEndpoint: `${process.env.REACT_APP_BACKEND_HOST}/icons/search`,
                                defaultValueFetchEndpoint: `icons`,
                                defaultValueResponsePayloadPath: ["data"],
                                searchPayloadIdPath: ["id"],
                                searchPayloadNamePath: ["icon_translation", "name"],
                            },
                        },
                        [`NESTEDDYNAMICFIELD_QUESTSTEPS_video_link_${nestedCollective.id}`]: {
                            type: 'text',
                            name: `video_link_NESTEDDYNAMICFIELD_QUESTSTEPS_${nestedCollective.id}`,
                            label: 'Video URL:',
                            value: nestedCollective?.video_link || "",
                            validation: _.isEmpty(nestedCollective?.video_link) ? youtubeLinkValidation : youtubeLinkValidation.optional(),
                            isPersistedRecord: true,
                        },
                        ..._.merge(
                            {},
                            ...nestedCollective.quest_step_translations.map(translation => ({
                            [`NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_collective_${translation.locale_id}`]: {
                                collectiveName: translation.locale.name,
                                [`NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_locale_id_${translation.locale_id}`]: {
                                    type: undefined,
                                    label: '',
                                    name: `locale_id_NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_${translation.locale_id}`,
                                    value: translation.locale_id,
                                    validation: undefined,
                                    isPersistedRecord: true,
                                },
                                [`NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_name_${translation.locale_id}`]: {
                                    type: 'text',
                                    name: `name_NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_${translation.locale_id}`,
                                    label: 'Nome:',
                                    value: translation.name,
                                    validation: _.isEmpty(translation.name) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                                    isPersistedRecord: true,
                                    extraProperties: {
                                        defaultValue: translation.name
                                    },
                                },
                                [`NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_description_${translation.locale_id}`]: {
                                    type: 'textarea',
                                    name: `description_NESTEDDYNAMICFIELD_${nestedCollective.id}_QUESTSTEPS_TRANSLATION_${translation.locale_id}`,
                                    label: 'Descrição:',
                                    value: translation.description,
                                    validation: _.isEmpty(translation.description) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                                    isPersistedRecord: true,
                                    extraProperties: {
                                        defaultValue: translation.description
                                    },
                                },
                            },
                        })))
                    },
                }))
            }
            else {
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