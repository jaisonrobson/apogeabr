import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const icon_id = form.get('icon_id')
    const iscity = form.get('iscity')
    const webx = form.get('webx')
    const weby = form.get('weby')
    const webz = form.get('webz')
    const x = form.get('x')
    const y = form.get('y')
    const z = form.get('z')

    const requestValues = Object.fromEntries(form.entries())

    const locationRequestPayload = { location: {
        icon_id,
        iscity,
        webx,
        weby,
        webz,
        x,
        y,
        z,
    } }

    console.log("locationRequestPayload", locationRequestPayload)

    try {
        const locationResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/locations`, locationRequestPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        const locationId = locationResponse.data.id

        const requestGroups = groupData(filterEntries(requestValues, "DIFY_"), "DIFY")

        const translationRequests = _.map(requestGroups, (value) => {
            const requestPayload = { location_translation: value }

            return axios.post(`${process.env.REACT_APP_BACKEND_HOST}/locations/${locationId}/translations`, requestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
        })

        const translationResponses = await Promise.all(translationRequests)

        const successMessages = [
            locationResponse.data,
            ...translationResponses.map(res => res.data)
        ]

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(successMessages))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action