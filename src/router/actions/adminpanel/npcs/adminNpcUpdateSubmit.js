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

    const npcId = form.get('id')
    const iconId = form.get('icon_id')

    const allValues = Object.fromEntries(form.entries())

    // Extrair campos iniciais do NPC
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

    // Extrair campos de tradução do NPC
    const npcTranslationValues = _.pickBy(
        allValues,
        (value, key) => key.includes("DIFY_")
    )

    // Extrair campos temporários de locations
    const temporaryLocationsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_LOCATIONS_")
    )

    // Extrair campos dinâmicos de locations
    const dynamicLocationsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_LOCATIONS_")
    )

    // Extrair campos temporários de itens que compra
    const temporaryItemBuysValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_ITEMBUYS_")
    )

    // Extrair campos dinâmicos de itens que compra
    const dynamicItemBuysValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_ITEMBUYS_")
    )

    // Extrair campos temporários de itens que vende
    const temporaryItemSellsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("TMPFY_ITEMSELLS_")
    )

    // Extrair campos dinâmicos de itens que vende
    const dynamicItemSellsValues = _.pickBy(
        allValues,
        (value, key) => key.includes("NESTEDDYNAMICFIELD_ITEMSELLS_")
    )

    // Agrupar valores temporários de locations
    const groupedTemporaryLocationsValues = groupData(
        temporaryLocationsValues,
        "TMPFY_LOCATIONS"
    )

    // Agrupar valores dinâmicos de locations
    const groupedDynamicLocationsValues = groupData(
        dynamicLocationsValues,
        "NESTEDDYNAMICFIELD_LOCATIONS",
        ({ key, value, result }) => {
            const locationId = key.match(/NESTEDDYNAMICFIELD_LOCATIONS_(\d+)/)?.[1]
            return { ...result, locationId }
        }
    )

    // Agrupar valores temporários de itens que compra
    const groupedTemporaryItemBuysValues = groupData(
        temporaryItemBuysValues,
        "TMPFY_ITEMBUYS"
    )

    // Agrupar valores dinâmicos de itens que compra
    const groupedDynamicItemBuysValues = groupData(
        dynamicItemBuysValues,
        "NESTEDDYNAMICFIELD_ITEMBUYS",
        ({ key, value, result }) => {
            const itemId = key.match(/NESTEDDYNAMICFIELD_ITEMBUYS_(\d+)/)?.[1]
            return { ...result, itemId }
        }
    )

    // Agrupar valores temporários de itens que vende
    const groupedTemporaryItemSellsValues = groupData(
        temporaryItemSellsValues,
        "TMPFY_ITEMSELLS"
    )

    // Agrupar valores dinâmicos de itens que vende
    const groupedDynamicItemSellsValues = groupData(
        dynamicItemSellsValues,
        "NESTEDDYNAMICFIELD_ITEMSELLS",
        ({ key, value, result }) => {
            const itemId = key.match(/NESTEDDYNAMICFIELD_ITEMSELLS_(\d+)/)?.[1]
            return { ...result, itemId }
        }
    )

    try {
        const requests = []

        // Processar campos iniciais do NPC
        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { npc: initialRequestValues }

            const initialRequestResponse = await axios.put(
                `${process.env.REACT_APP_BACKEND_HOST}/npcs/${npcId}`,
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

        // Processar traduções do NPC
        const groupedNpcTranslationValues = groupData(
            npcTranslationValues,
            "DIFY",
            ({ key, value, result }) => ({
                ...result,
                isPersistedField: _.includes(persistedFields, key)
            })
        )

        const onlyTouchedTranslationFields = removeGroupsByFiltersExclusively(
            groupedNpcTranslationValues,
            ["id", "isPersistedField"]
        )

        if (!_.isEmpty(onlyTouchedTranslationFields)) {
            _.forEach(onlyTouchedTranslationFields, async (value) => {
                const requestPayload = { npc_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/npcs/${npcId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/npcs/${npcId}/translations`,
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

        // Processar locations temporárias
        if (!_.isEmpty(groupedTemporaryLocationsValues)) {
            _.forEach(groupedTemporaryLocationsValues, async (locationObject) => {
                const locationRequestPayload = {
                    locations_npc: {
                        npc_id: npcId,
                        ...locationObject
                    }
                }

                const locationRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/locations_npcs`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: locationRequestPayload,
                })

                requests.push(locationRequest)
            })
        }

        // Processar locations dinâmicas
        const onlyTouchedDynamicLocationsFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicLocationsValues,
            ["locationId"]
        )

        if (!_.isEmpty(onlyTouchedDynamicLocationsFields)) {
            _.forEach(onlyTouchedDynamicLocationsFields, async (dynamicLocationField) => {
                const requestPayload = {
                    locations_npc: _.omit(dynamicLocationField, ["locationId"])
                }

                const locationRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/locations_npcs/${dynamicLocationField.locationId}/${npcId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(locationRequest)
            })
        }

        // Processar itens que compra temporários
        if (!_.isEmpty(groupedTemporaryItemBuysValues)) {
            _.forEach(groupedTemporaryItemBuysValues, async (itemBuyObject) => {
                const itemBuyRequestPayload = {
                    item_npc_buy: {
                        npc_id: npcId,
                        ...itemBuyObject
                    }
                }

                const itemBuyRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemBuyObject.item_id}/npcs_buy`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemBuyRequestPayload,
                })

                requests.push(itemBuyRequest)
            })
        }

        // Processar itens que compra dinâmicos
        const onlyTouchedDynamicItemBuysFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicItemBuysValues,
            ["itemId"]
        )

        if (!_.isEmpty(onlyTouchedDynamicItemBuysFields)) {
            _.forEach(onlyTouchedDynamicItemBuysFields, async (dynamicItemBuyField) => {
                const requestPayload = {
                    item_npc_buy: _.omit(dynamicItemBuyField, ["itemId"])
                }

                const itemBuyRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${dynamicItemBuyField.itemId}/npcs_buy/${npcId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemBuyRequest)
            })
        }

        // Processar itens que vende temporários
        if (!_.isEmpty(groupedTemporaryItemSellsValues)) {
            _.forEach(groupedTemporaryItemSellsValues, async (itemSellObject) => {
                const itemSellRequestPayload = {
                    item_npc_sell: {
                        npc_id: npcId,
                        ...itemSellObject
                    }
                }

                const itemSellRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${itemSellObject.item_id}/npcs_sell`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: itemSellRequestPayload,
                })

                requests.push(itemSellRequest)
            })
        }

        // Processar itens que vende dinâmicos
        const onlyTouchedDynamicItemSellsFields = removeNestedGroupsByFiltersExclusively(
            groupedDynamicItemSellsValues,
            ["itemId"]
        )

        if (!_.isEmpty(onlyTouchedDynamicItemSellsFields)) {
            _.forEach(onlyTouchedDynamicItemSellsFields, async (dynamicItemSellField) => {
                const requestPayload = {
                    item_npc_sell: _.omit(dynamicItemSellField, ["itemId"])
                }

                const itemSellRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/items/${dynamicItemSellField.itemId}/npcs_sell/${npcId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(itemSellRequest)
            })
        }

        const responses = await Promise.all(requests)

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS.path.slice(0, -1)}?success=${encodeURIComponent(
                JSON.stringify(responses.map((res) => res.data))
            )}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action