import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, "DIFY_")
    const initialRequestValues = _.omitBy(
        Object.fromEntries(form.entries()),
        (value, key) => key.includes("_id") || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    // Transforma os valores do formulário no formato esperado pelo backend
    const validationData = _.reduce(initialRequestValues, (acc, value, key) => {
        if (key.startsWith('validate-')) {
            const videoId = key.replace('validate-', '')
            acc[videoId] = Boolean(Number(value)) // Converte 'on' para boolean
        }
        return acc
    }, {})

    try {
        const initialRequestPayload = { validation_data: validationData }

        const initialRequestResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/videos/validate`, initialRequestPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        const successMessages = [
            initialRequestResponse.data,
        ]

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_VIDEOS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(successMessages))}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_VIDEOS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action 