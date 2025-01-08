import { redirect } from 'react-router-dom'
import axios from 'axios'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    try {
        const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/login`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        localStorage.setItem('token', response.data.token)

        return redirect(ROUTES.HOME.path)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_LOGIN.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action