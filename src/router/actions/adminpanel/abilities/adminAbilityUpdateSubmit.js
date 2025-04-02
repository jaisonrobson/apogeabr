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

    const natureId = form.get('nature_id')
    const abilityId = form.get('id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, ["DIFY_", "TMPFY_", "NESTEDDYNAMICFIELD"])
    const initialRequestValues = _.omitBy(
        allValues,
        (value, key) => key === "id" || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )
    initialRequestValues["nature_id"] = natureId
/*
    const temporaryQuestStepsTranslationsRequestValues = _.pickBy(
        allValues,
        (value, key) => /^.+_TMPFY_.+_QUESTSTEPS_TRANSLATION_.+$/.test(key)
    )
    const temporaryQuestStepsRequestValues = _.omitBy(
        _.pickBy(allValues, (value, key) => key.includes("_TMPFY_")),
        (value, key) => key in temporaryQuestStepsTranslationsRequestValues
    )    
    const temporaryQuestStepsValues = groupData(
        filterEntries(temporaryQuestStepsRequestValues, "TMPFY_"),
        "TMPFY"
    )
    const temporaryQuestStepsTranslationsValues = groupDataByLevels(
        temporaryQuestStepsTranslationsRequestValues,
        ["TMPFY_", "TRANSLATION_"],
        [/(_TMPFY_\d+)/, /(_QUESTSTEPS_TRANSLATION_\d+)/]
    )
    const dynamicQuestStepsTranslationsRequestValues = _.pickBy(
        allValues,
        (value, key) => /^.+_NESTEDDYNAMICFIELD_.+_QUESTSTEPS_TRANSLATION_.+$/.test(key)
    )
    const dynamicQuestStepsRequestValues = _.omitBy(
        _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_")),
        (value, key) => key in dynamicQuestStepsTranslationsRequestValues
    )
    const dynamicQuestStepsValues = groupData(
        dynamicQuestStepsRequestValues,
        "NESTEDDYNAMICFIELD_QUESTSTEPS",
        ({ key, value, result }) => {
            let finalResult = result

            const questStepId = key.match(/NESTEDDYNAMICFIELD_QUESTSTEPS_(\d+)/)?.[1]

            finalResult["questStepId"] = questStepId

            return finalResult
        }
    )
    const dynamicQuestStepsTranslationsValues = groupDataByLevels(
        dynamicQuestStepsTranslationsRequestValues,
        ["NESTEDDYNAMICFIELD_", "TRANSLATION_"],
        [/(_NESTEDDYNAMICFIELD_\d+)/, /(_QUESTSTEPS_TRANSLATION_\d+)/],
        [
            ({ key }) => {
                const questStepId = key.match(/NESTEDDYNAMICFIELD_(\d+)/)?.[1]
                return { questStepId }
            },
            ({ key, currentObject }) => {
                const isPersisted = _.includes(persistedFields, key)

                return { ...currentObject, isPersistedField: isPersisted }
            }
        ]
    )
*/

    try {
        const requests = []

        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { ability: initialRequestValues }

            const initialRequestResponse = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/abilities/${abilityId}`, initialRequestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            requests.push(initialRequestResponse)
        }

        const translationGroups = groupData(
            filterEntries(allValues, "DIFY_"),
            "DIFY",
            ({ key, value, result: resultParam }) => {
                let result = resultParam

                result["isPersistedField"] = _.includes(persistedFields, key)

                return result
            }
        )

        const onlyTouchedTranslationFields = removeGroupsByFiltersExclusively(translationGroups, ["id", "isPersistedField"])

        if (!_.isEmpty(onlyTouchedTranslationFields)) {
            _.forEach(onlyTouchedTranslationFields, async (value) => {
                const requestPayload = { ability_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/abilities/${abilityId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/abilities/${abilityId}/translations`,
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
/*
        const temporaryQuestStepFieldsRequestGroups = deepMerge([temporaryQuestStepsTranslationsValues, temporaryQuestStepsValues])

        if (!_.isEmpty(temporaryQuestStepFieldsRequestGroups)) {
            _.forEach(temporaryQuestStepFieldsRequestGroups, async (questStepObject) => {
                const questStepRequestPayload = { quest_step: { quest_id: abilityId, ...(_.omitBy(questStepObject, (v, k) => k.includes("TRANSLATION"))) } }

                const questStepRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${abilityId}/quest_steps`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: questStepRequestPayload,
                })

                requests.push(questStepRequest)

                const questStepId = questStepRequest.data.id

                const tmpQuestStepTranslationFieldsGroups = _.pickBy(questStepObject, (v, k) => k.includes("TRANSLATION"))

                _.forEach(tmpQuestStepTranslationFieldsGroups, async (questStepTranslationObject) => {
                    const questStepTranslationRequestPayload = { quest_step_translation: { quest_id: abilityId, ...questStepTranslationObject } }

                    const questStepTranslationRequest = await axios.request({
                        url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${abilityId}/quest_steps/${questStepId}/translations`,
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

        const onlyTouchedDynamicFields = removeNestedGroupsByFiltersExclusively(dynamicQuestStepsTranslationsValues, ["locale_id", "isPersistedField"])

        if (!_.isEmpty(onlyTouchedDynamicFields)) {
            _.forEach(onlyTouchedDynamicFields, async (nestedDynamicField) => {
                const dynamicTranslationField = _.omit(nestedDynamicField, ["questStepId"])

                if (!_.isEmpty(dynamicTranslationField)) {
                    _.forEach(dynamicTranslationField, async (nestedDynamicTranslationField) => {
                        const requestPayload = { quest_step_translation: _.omit(nestedDynamicTranslationField, "isPersistedField") }
    
                        const translationRequest = await axios.request({
                            url: nestedDynamicTranslationField.isPersistedField
                                ? `${process.env.REACT_APP_BACKEND_HOST}/quests/${abilityId}/quest_steps/${nestedDynamicField.questStepId}/translations/${nestedDynamicTranslationField.locale_id}`
                                : `${process.env.REACT_APP_BACKEND_HOST}/quests/${abilityId}/quest_steps/${nestedDynamicField.questStepId}/translations`,
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

        const onlyTouchedDynamicQuestStepsFields = removeNestedGroupsByFiltersExclusively(dynamicQuestStepsValues, ["questStepId"])

        if (!_.isEmpty(onlyTouchedDynamicQuestStepsFields)) {
            _.forEach(onlyTouchedDynamicQuestStepsFields, async (dynamicQuestStepField) => {
                const requestPayload = { quest_step: _.omit(dynamicQuestStepField, ["isPersistedField", "questStepId"]) }

                const questStepRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/quests/${abilityId}/quest_steps/${dynamicQuestStepField.questStepId}`,
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
*/

        const responses = await Promise.all(requests)

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES.path.slice(0, -1)}?success=${encodeURIComponent(
                JSON.stringify(responses.map((res) => res.data))
            )}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}


export default action