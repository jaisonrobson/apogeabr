import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const itemCategoryId = form.get('item_category_id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, "DIFY_")
    const initialRequestValues = _.omitBy(
        Object.fromEntries(form.entries()),
        (value, key) => key.includes("_id") || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    if (itemCategoryId)
        initialRequestValues["item_category_id"] = itemCategoryId

    try {
        const initialRequestPayload = { item: initialRequestValues }

        const initialRequestResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/items`, initialRequestPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        const itemId = initialRequestResponse.data.id

        const requestGroups = groupData(filterEntries(allValues, "DIFY_"), "DIFY")

        const translationRequests = _.map(requestGroups, (value) => {
            const requestPayload = { item_translation: value }

            return axios.post(`${process.env.REACT_APP_BACKEND_HOST}/items/${itemId}/translations`, requestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
        })

        const responses = await Promise.all([initialRequestResponse, ...translationRequests])

        const successMessages = [
            initialRequestResponse.data,
            ...responses.slice(1).map(res => res.data)
        ]

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(successMessages))}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action 