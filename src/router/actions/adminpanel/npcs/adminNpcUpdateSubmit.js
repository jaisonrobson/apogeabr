import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData, removeGroupsByFiltersExclusively } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const persistedFields = _.split(form.get('persisted'), ',')
    const nonPersistedFields = _.split(form.get('non_persisted'), ',')

    const npcId = form.get('id')
    const iconId = form.get('icon_id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, ["DIFY_", "TMPFY_", "NESTEDDYNAMICFIELD"])
    const initialRequestValues = _.omitBy(
        Object.fromEntries(form.entries()),
        (value, key) => key.includes("id") || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    if (iconId)
        initialRequestValues["icon_id"] = iconId

    try {
        const requests = []

        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { npc: initialRequestValues }

            const initialRequestResponse = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/npcs/${npcId}`, initialRequestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            requests.push(initialRequestResponse)
        }

        const requestGroups = groupData(
            filterEntries(allValues, "DIFY_"),
            "DIFY",
            ({ key, value, result: resultParam }) => {
                let result = resultParam

                result["isPersistedField"] = _.includes(persistedFields, key)

                return result
            }
        )

        const onlyTouchedFieldsRequests = removeGroupsByFiltersExclusively(requestGroups, ["id", "isPersistedField"])

        if (!_.isEmpty(onlyTouchedFieldsRequests)) {
            _.forEach(onlyTouchedFieldsRequests, async (value) => {
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

        const temporaryFieldsRequestGroups = groupData(
            filterEntries(allValues, "TMPFY_"),
            "TMPFY",
            ({ key, value, result: resultParam }) => {
                let result = resultParam

                result["isPersistedField"] = _.includes(persistedFields, key)

                return result
            }
        )

        if (!_.isEmpty(temporaryFieldsRequestGroups)) {
            _.forEach(temporaryFieldsRequestGroups, async (value) => {
                const requestPayload = { locations_npc: { npc_id: npcId, ...(_.omit(value, "isPersistedField")) } }

                const locationsNpcRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/locations_npcs`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(locationsNpcRequest)
            })
        }

        const nestedDynamicFieldsRequestGroups = groupData(
            filterEntries(allValues, "NESTEDDYNAMICFIELD_"),
            "NESTEDDYNAMICFIELD",
            ({ key, value, result: resultParam }) => {
                let result = resultParam

                result["isPersistedField"] = _.includes(persistedFields, key)

                return result
            },
            true
        )

        if (!_.isEmpty(nestedDynamicFieldsRequestGroups)) {
            _.forEach(nestedDynamicFieldsRequestGroups, async (value) => {
                const requestPayload = { locations_npc: { npc_id: npcId, ...(_.omit(value, "isPersistedField", "dependantValue")) } }

                const locationsNpcRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/locations_npcs/${value.dependantValue}/${npcId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(locationsNpcRequest)
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