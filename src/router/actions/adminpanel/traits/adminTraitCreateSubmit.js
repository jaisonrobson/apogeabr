import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const iconId = form.get('icon_id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, "DIFY_")
    const initialRequestValues = _.omitBy(
        Object.fromEntries(form.entries()),
        (value, key) => key.includes("id") || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    if (iconId)
        initialRequestValues["icon_id"] = iconId

    try {
        const initialRequestPayload = { trait: initialRequestValues }

        const initialRequestResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/traits`, initialRequestPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        const traitId = initialRequestResponse.data.id

        const requestGroups = groupData(filterEntries(allValues, "DIFY_"), "DIFY")

        const translationRequests = _.map(requestGroups, (value) => {
            const requestPayload = { trait_translation: value }

            return axios.post(`${process.env.REACT_APP_BACKEND_HOST}/traits/${traitId}/translations`, requestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
        })

        const translationResponses = await Promise.all(translationRequests)

        const successMessages = [
            initialRequestResponse.data,
            ...translationResponses.map(res => res.data)
        ]

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(successMessages))}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action