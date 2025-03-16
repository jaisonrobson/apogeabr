import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { filterEntries, groupData } from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const image = form.get('image')

    const requestValues = Object.fromEntries(form.entries())

    const iconRequestPayload = { icon: { image } }

    try {
        const iconResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/icons`, iconRequestPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        const iconId = iconResponse.data.id

        const requestGroups = groupData(filterEntries(requestValues, "DIFY_"), "DIFY")

        const translationRequests = _.map(requestGroups, (value) => {
            const requestPayload = { icon_translation: value }

            return axios.post(`${process.env.REACT_APP_BACKEND_HOST}/icons/${iconId}/translations`, requestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
        })

        const translationResponses = await Promise.all(translationRequests)

        const successMessages = [
            iconResponse.data,
            ...translationResponses.map(res => res.data)
        ]

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(successMessages))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action