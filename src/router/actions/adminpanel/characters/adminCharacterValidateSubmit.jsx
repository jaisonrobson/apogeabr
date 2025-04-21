import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()
    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, "DIFY_")

    const initialRequestValues = _.omitBy(
        Object.fromEntries(form.entries()),
        (value, key) => key.includes("_id") || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    try {
        const requestPayload = { unique_validation_code: initialRequestValues }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/unique_validation_codes/validate_code`, requestPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_CHARACTERS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_CHARACTERS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action 