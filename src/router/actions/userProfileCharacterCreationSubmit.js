import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const requestValues = Object.fromEntries(form.entries())
    
    const payload = { character: requestValues }

    console.log(payload)

    try {
        const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/characters`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        

        return redirect(`${ROUTES.USER_PROFILE_CHARACTERS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_PROFILE_CHARACTERS_CREATE.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action