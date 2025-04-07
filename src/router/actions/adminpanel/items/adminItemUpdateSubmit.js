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

    const temporaryItemQuestsRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_ITEMQUESTS_"))

    const temporaryItemQuestsValues = groupData(
        filterEntries(temporaryItemQuestsRequestValues, "TMPFY_ITEMQUESTS"),
        "TMPFY_ITEMQUESTS"
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

    const temporaryItemMonstersRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_ITEMMONSTERS_"))

    const temporaryItemMonstersValues = groupData(
        filterEntries(temporaryItemMonstersRequestValues, "TMPFY_ITEMMONSTERS"),
        "TMPFY_ITEMMONSTERS"
    )

    const dynamicItemMonstersRequestValues = _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_ITEMMONSTERS_"))

    const dynamicItemMonstersValues = groupData(
        dynamicItemMonstersRequestValues,
        "NESTEDDYNAMICFIELD_ITEMMONSTERS",
        ({ key, value, result }) => {
            let finalResult = result

            const itemMonsterId = key.match(/NESTEDDYNAMICFIELD_ITEMMONSTERS_(\d+)/)?.[1]

            finalResult["itemMonsterId"] = itemMonsterId

            return finalResult
        }
    )

    const temporaryItemNpcBuysRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_ITEMNPCBUYS_"))

    const temporaryItemNpcBuysValues = groupData(
        filterEntries(temporaryItemNpcBuysRequestValues, "TMPFY_ITEMNPCBUYS"),
        "TMPFY_ITEMNPCBUYS"
    )

    const dynamicItemNpcBuysRequestValues = _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_ITEMNPCBUYS_"))

    const dynamicItemNpcBuysValues = groupData(
        dynamicItemNpcBuysRequestValues,
        "NESTEDDYNAMICFIELD_ITEMNPCBUYS",
        ({ key, value, result }) => {
            let finalResult = result

            const itemNpcBuyId = key.match(/NESTEDDYNAMICFIELD_ITEMNPCBUYS_(\d+)/)?.[1]

            finalResult["itemNpcBuyId"] = itemNpcBuyId

            return finalResult
        }
    )

    const temporaryItemNpcSellsRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_ITEMNPCSELLS_"))

    const temporaryItemNpcSellsValues = groupData(
        filterEntries(temporaryItemNpcSellsRequestValues, "TMPFY_ITEMNPCSELLS"),
        "TMPFY_ITEMNPCSELLS"
    )

    const dynamicItemNpcSellsRequestValues = _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_ITEMNPCSELLS_"))

    const dynamicItemNpcSellsValues = groupData(
        dynamicItemNpcSellsRequestValues,
        "NESTEDDYNAMICFIELD_ITEMNPCSELLS",
        ({ key, value, result }) => {
            let finalResult = result

            const itemNpcSellId = key.match(/NESTEDDYNAMICFIELD_ITEMNPCSELLS_(\d+)/)?.[1]

            finalResult["itemNpcSellId"] = itemNpcSellId

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

        if (!_.isEmpty(temporaryItemMonstersValues)) {
            _.forEach(temporaryItemMonstersValues, async (itemMonsterObject) => {
                const itemMonsterRequestPayload = { item_monster: itemMonsterObject }

                const itemMonsterRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/monsters`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemMonsterRequestPayload,
                })

                requests.push(itemMonsterRequest)
            })
        }

        const onlyTouchedDynamicItemMonstersFields = removeNestedGroupsByFiltersExclusively(dynamicItemMonstersValues, ["itemMonsterId"])

        if (!_.isEmpty(onlyTouchedDynamicItemMonstersFields)) {
            _.forEach(onlyTouchedDynamicItemMonstersFields, async (dynamicItemMonsterField) => {
                const requestPayload = { item_monster: _.omit(dynamicItemMonsterField, ["itemMonsterId"]) }

                const itemMonsterRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/monsters/${dynamicItemMonsterField.itemMonsterId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemMonsterRequest)
            })
        }

        if (!_.isEmpty(temporaryItemNpcBuysValues)) {
            _.forEach(temporaryItemNpcBuysValues, async (itemNpcBuyObject) => {
                const itemNpcBuyRequestPayload = { item_npc_buy: itemNpcBuyObject }

                const itemNpcBuyRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/npcs_buy`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemNpcBuyRequestPayload,
                })

                requests.push(itemNpcBuyRequest)
            })
        }

        const onlyTouchedDynamicItemNpcBuysFields = removeNestedGroupsByFiltersExclusively(dynamicItemNpcBuysValues, ["itemNpcBuyId"])

        if (!_.isEmpty(onlyTouchedDynamicItemNpcBuysFields)) {
            _.forEach(onlyTouchedDynamicItemNpcBuysFields, async (dynamicItemNpcBuyField) => {
                const requestPayload = { item_npc_buy: _.omit(dynamicItemNpcBuyField, ["itemNpcBuyId"]) }

                const itemNpcBuyRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/npcs_buy/${dynamicItemNpcBuyField.itemNpcBuyId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemNpcBuyRequest)
            })
        }

        if (!_.isEmpty(temporaryItemNpcSellsValues)) {
            _.forEach(temporaryItemNpcSellsValues, async (itemNpcSellObject) => {
                const itemNpcSellRequestPayload = { item_npc_sell: itemNpcSellObject }

                const itemNpcSellRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/npcs_sell`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemNpcSellRequestPayload,
                })

                requests.push(itemNpcSellRequest)
            })
        }

        const onlyTouchedDynamicItemNpcSellsFields = removeNestedGroupsByFiltersExclusively(dynamicItemNpcSellsValues, ["itemNpcSellId"])

        if (!_.isEmpty(onlyTouchedDynamicItemNpcSellsFields)) {
            _.forEach(onlyTouchedDynamicItemNpcSellsFields, async (dynamicItemNpcSellField) => {
                const requestPayload = { item_npc_sell: _.omit(dynamicItemNpcSellField, ["itemNpcSellId"]) }

                const itemNpcSellRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/npcs_sell/${dynamicItemNpcSellField.itemNpcSellId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemNpcSellRequest)
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