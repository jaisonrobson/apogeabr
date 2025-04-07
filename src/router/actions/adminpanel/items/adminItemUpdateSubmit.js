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

    const itemCategoryId = form.get('item_category_id')
    const itemId = form.get('id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, ["DIFY_", "TMPFY_", "NESTEDDYNAMICFIELD"])
    const initialRequestValues = _.omitBy(
        allValues,
        (value, key) => key === "id" || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    if (itemCategoryId)
        initialRequestValues["item_category_id"] = itemCategoryId

    const temporaryItemQuestsRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_"))

    const temporaryItemQuestsValues = groupData(
        filterEntries(temporaryItemQuestsRequestValues, "TMPFY_"),
        "TMPFY"
    )

    const dynamicItemQuestsRequestValues = _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_"))

    const dynamicItemQuestsValues = groupData(
        dynamicItemQuestsRequestValues,
        "NESTEDDYNAMICFIELD_ITEMQUESTS",
        ({ key, value, result }) => {
            let finalResult = result

            const itemQuestId = key.match(/NESTEDDYNAMICFIELD_ITEMQUESTS_(\d+)/)?.[1]

            finalResult["itemQuestId"] = itemQuestId

            return finalResult
        }
    )

    try {
        const requests = []

        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { item: initialRequestValues }

            const initialRequestResponse = await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}`, initialRequestPayload, {
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
                const requestPayload = { item_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/translations`,
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

        if (!_.isEmpty(temporaryItemQuestsValues)) {
            _.forEach(temporaryItemQuestsValues, async (itemQuestObject) => {
                const itemQuestRequestPayload = { item_quest: itemQuestObject }

                const itemQuestRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/quests`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemQuestRequestPayload,
                })

                requests.push(itemQuestRequest)
            })
        }

        const onlyTouchedDynamicItemQuestsFields = removeNestedGroupsByFiltersExclusively(dynamicItemQuestsValues, ["itemQuestId"])

        if (!_.isEmpty(onlyTouchedDynamicItemQuestsFields)) {
            _.forEach(onlyTouchedDynamicItemQuestsFields, async (dynamicItemQuestField) => {
                const requestPayload = { item_quest: _.omit(dynamicItemQuestField, ["itemQuestId"]) }

                const itemQuestRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/quests/${dynamicItemQuestField.itemQuestId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemQuestRequest)
            })
        }

        const responses = await Promise.all(requests)

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path.slice(0, -1)}?success=${encodeURIComponent(
                JSON.stringify(responses.map((res) => res.data))
            )}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action 