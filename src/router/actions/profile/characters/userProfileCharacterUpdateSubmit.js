import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const character_id = form.get('character_id')
    const image = form.get('image')

    const requestValues = _.omit(Object.fromEntries(form.entries()), 'character_id')

    const values = (image === null || image === "null") ? _.omit(requestValues, 'image') : requestValues

    const payload = { character: values }

    try {
        const response = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/characters/${character_id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        return redirect(`${ROUTES.USER_PROFILE_CHARACTERS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_PROFILE_CHARACTERS_UPDATE.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action