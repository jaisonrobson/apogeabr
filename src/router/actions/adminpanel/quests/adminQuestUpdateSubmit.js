import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import {
    filterEntries,
    groupData,
    removeGroupsByFiltersExclusively,
    groupDataByLevels,
    deepMerge,
    removeNestedGroupsByFiltersExclusively    
} from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const persistedFields = _.split(form.get('persisted'), ',')
    const nonPersistedFields = _.split(form.get('non_persisted'), ',')

    const questId = form.get('id')

    const allValues = Object.fromEntries(form.entries())

    // Extrair campos iniciais da quest
    const initialRequestValues = _.omitBy(
        allValues,
        (value, key) => 
            key === "id" || 
            key === "persisted" || 
            key === "non_persisted" || 
            key.includes("DIFY_") || 
            key.includes("TMPFY_") || 
            key.includes("NESTEDDYNAMICFIELD_")
    )

    // Extrair campos de tradução da quest
    const questTranslationValues = _.pickBy(
        allValues,
        (value, key) => key.includes("DIFY_QUEST_TRANSLATION_")
    )

    // Extrair campos temporários dos passos da quest
    const temporaryQuestStepsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_QUEST_STEP_") && !key.includes("TRANSLATION")
    )

    // Extrair campos temporários de tradução dos passos da quest
    const temporaryQuestStepsTranslationValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_QUEST_STEP_") && key.includes("TRANSLATION")
    )

    // Extrair campos dinâmicos dos passos da quest
    const dynamicQuestStepsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_QUEST_STEP_") && !key.includes("TRANSLATION")
    )

    // Extrair campos dinâmicos de tradução dos passos da quest
    const dynamicQuestStepsTranslationValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_QUEST_STEP_") && key.includes("TRANSLATION")
    )

    // Extrair campos temporários dos itens da quest
    const temporaryQuestItemsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_QUESTITEMS_")
    )

    // Extrair campos dinâmicos dos itens da quest
    const dynamicQuestItemsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_QUESTITEMS_")
    )

    // Agrupar valores temporários dos passos da quest
    const groupedTemporaryQuestStepsValues = groupData(
        temporaryQuestStepsValues,
        "TMPFY_QUEST_STEP"
    )

    // Agrupar valores temporários de tradução dos passos da quest
    const groupedTemporaryQuestStepsTranslationValues = groupDataByLevels(
        temporaryQuestStepsTranslationValues,
        ["TMPFY_", "TRANSLATION_"],
        [/(_TMPFY_\d+)/, /(_QUEST_STEP_TRANSLATION_\d+)/]
    )

    // Agrupar valores dinâmicos dos passos da quest
    const groupedDynamicQuestStepsValues = groupData(
        dynamicQuestStepsValues,
        "NESTEDDYNAMICFIELD_QUEST_STEP",
        ({ key, value, result }) => {
            const questStepId = key.match(/NESTEDDYNAMICFIELD_QUEST_STEP_(\d+)/)?.[1]
            return { ...result, questStepId }
        }
    )

    // Agrupar valores dinâmicos de tradução dos passos da quest
    const groupedDynamicQuestStepsTranslationValues = groupDataByLevels(
        dynamicQuestStepsTranslationValues,
        ["NESTEDDYNAMICFIELD_", "TRANSLATION_"],
        [/(_NESTEDDYNAMICFIELD_\d+)/, /(_QUEST_STEP_TRANSLATION_\d+)/],
        [
            ({ key }) => {
                const questStepId = key.match(/NESTEDDYNAMICFIELD_(\d+)/)?.[1]
                return { questStepId }
            },
            ({ key, currentObject }) => ({
                ...currentObject,
                isPersistedField: _.includes(persistedFields, key)
            })
        ]
    )

    // Agrupar valores temporários dos itens da quest
    const groupedTemporaryQuestItemsValues = groupData(
        temporaryQuestItemsValues,
        "TMPFY_QUESTITEMS"
    )

    // Agrupar valores dinâmicos dos itens da quest
    const groupedDynamicQuestItemsValues = groupData(
        dynamicQuestItemsValues,
        "NESTEDDYNAMICFIELD_QUESTITEMS",
        ({ key, value, result }) => {
            const questItemId = key.match(/NESTEDDYNAMICFIELD_QUESTITEMS_(\d+)/)?.[1]
            return { ...result, questItemId }
        }
    )

    try {
        const requests = []

        // Processar campos iniciais da quest
        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { quest: initialRequestValues }

            const initialRequestResponse = await axios.put(
                `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}`,
                initialRequestPayload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )

            requests.push(initialRequestResponse)
        }

        // Processar traduções da quest
        const groupedQuestTranslationValues = groupData(
            questTranslationValues,
            "DIFY_QUEST_TRANSLATION",
            ({ key, value, result }) => ({
                ...result,
                isPersistedField: _.includes(persistedFields, key)
            })
        )

        const onlyTouchedTranslationFields = removeGroupsByFiltersExclusively(
            groupedQuestTranslationValues,
            ["id", "isPersistedField"]
        )

        if (!_.isEmpty(onlyTouchedTranslationFields)) {
            _.forEach(onlyTouchedTranslationFields, async (value) => {
                const requestPayload = { quest_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/translations`,
                    method: value.isPersistedField ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(translationRequest)
            })
        }

        // Processar passos temporários da quest
        const temporaryQuestStepFieldsRequestGroups = deepMerge([
            groupedTemporaryQuestStepsTranslationValues,
            groupedTemporaryQuestStepsValues
        ])

        if (!_.isEmpty(temporaryQuestStepFieldsRequestGroups)) {
            _.forEach(temporaryQuestStepFieldsRequestGroups, async (questStepObject) => {
                const questStepRequestPayload = {
                    quest_step: {
                        quest_id: questId,
                        ...(_.omitBy(questStepObject, (v, k) => k.includes("TRANSLATION")))
                    }
                }

                const questStepRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/quest_steps`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: questStepRequestPayload,
                })

                requests.push(questStepRequest)

                const questStepId = questStepRequest.data.id

                const tmpQuestStepTranslationFieldsGroups = _.pickBy(
                    questStepObject,
                    (v, k) => k.includes("TRANSLATION")
                )

                _.forEach(tmpQuestStepTranslationFieldsGroups, async (questStepTranslationObject) => {
                    const questStepTranslationRequestPayload = {
                        quest_step_translation: {
                            quest_id: questId,
                            ...questStepTranslationObject
                        }
                    }

                    const questStepTranslationRequest = await axios.request({
                        url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/quest_steps/${questStepId}/translations`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        data: questStepTranslationRequestPayload,
                    })

                    requests.push(questStepTranslationRequest)
                })
            })
        }

        // Processar traduções dos passos dinâmicos da quest
        const onlyTouchedDynamicFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicQuestStepsTranslationValues,
            ["locale_id", "isPersistedField"]
        )

        if (!_.isEmpty(onlyTouchedDynamicFields)) {
            _.forEach(onlyTouchedDynamicFields, async (nestedDynamicField) => {
                const dynamicTranslationField = _.omit(nestedDynamicField, ["questStepId"])

                if (!_.isEmpty(dynamicTranslationField)) {
                    _.forEach(dynamicTranslationField, async (nestedDynamicTranslationField) => {
                        const requestPayload = {
                            quest_step_translation: _.omit(nestedDynamicTranslationField, "isPersistedField")
                        }

                        const translationRequest = await axios.request({
                            url: nestedDynamicTranslationField.isPersistedField
                                ? `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/quest_steps/${nestedDynamicField.questStepId}/translations/${nestedDynamicTranslationField.locale_id}`
                                : `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/quest_steps/${nestedDynamicField.questStepId}/translations`,
                            method: nestedDynamicTranslationField.isPersistedField ? 'PUT' : 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                            data: requestPayload,
                        })

                        requests.push(translationRequest)
                    })
                }
            })
        }

        // Processar passos dinâmicos da quest
        const onlyTouchedDynamicQuestStepsFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicQuestStepsValues,
            ["questStepId"]
        )

        if (!_.isEmpty(onlyTouchedDynamicQuestStepsFields)) {
            _.forEach(onlyTouchedDynamicQuestStepsFields, async (dynamicQuestStepField) => {
                const requestPayload = {
                    quest_step: _.omit(dynamicQuestStepField, ["isPersistedField", "questStepId"])
                }

                const questStepRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${questId}/quest_steps/${dynamicQuestStepField.questStepId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(questStepRequest)
            })
        }

        // Processar itens temporários da quest
        if (!_.isEmpty(groupedTemporaryQuestItemsValues)) {
            _.forEach(groupedTemporaryQuestItemsValues, async (questItemObject) => {
                const questItemRequestPayload = {
                    item_quest: {
                        quest_id: questId,
                        ...questItemObject
                    }
                }

                const questItemRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${questItemObject.item_id}/quests`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: questItemRequestPayload,
                })

                requests.push(questItemRequest)
            })
        }

        // Processar itens dinâmicos da quest
        const onlyTouchedDynamicQuestItemsFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicQuestItemsValues,
            ["questItemId"]
        )

        if (!_.isEmpty(onlyTouchedDynamicQuestItemsFields)) {
            _.forEach(onlyTouchedDynamicQuestItemsFields, async (dynamicQuestItemField) => {
                const requestPayload = {
                    item_quest: _.omit(dynamicQuestItemField, ["questItemId"])
                }

                const questItemRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${dynamicQuestItemField.item_id}/quests/${questId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(questItemRequest)
            })
        }

        const responses = await Promise.all(requests)

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS.path.slice(0, -1)}?success=${encodeURIComponent(
                JSON.stringify(responses.map((res) => res.data))
            )}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action