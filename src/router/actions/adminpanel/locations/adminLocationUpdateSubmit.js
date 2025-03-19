import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData, removeGroupsByFiltersExclusively } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const persistedFields = _.split(form.get('persisted'), ',')
    const nonPersistedFields = _.split(form.get('non_persisted'), ',')

    const image = form.get('image')
    const iconId = form.get('id')

    const allValues = Object.fromEntries(form.entries())
    const filteredValues = _.omitBy(Object.fromEntries(form.entries()), (value, key) => key.includes("id") || key === "persisted" || key === "non_persisted")

    try {
        const requests = []

        if (image) {
            const iconRequestPayload = { icon: { image } }

            const imageRequest = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/icons/${iconId}`, iconRequestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            requests.push(imageRequest)
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
                const requestPayload = { icon_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/icons/${iconId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/icons/${iconId}/translations`,
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

        const responses = await Promise.all(requests)

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(responses.map(res => res.data)))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action