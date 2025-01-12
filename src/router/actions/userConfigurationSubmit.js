import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const user_id = form.get('user_id')

    const requestValues = _.omit(Object.fromEntries(form.entries()), 'user_id')
    
    const payload = { user: requestValues }

    try {
        const response = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/users/${user_id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        return redirect(`${ROUTES.USER_PROFILE_CONFIGURATION.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_PROFILE_CONFIGURATION.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action