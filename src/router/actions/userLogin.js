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
        const resultingError = {
            backendError: error?.response?.data,
            friendlyMessage: "Impossivel recuperar usuario, é necessário fazer o login novamente.",
        }
        ||
        {
            backendError: error.message,
            friendlyMessage: "Impossivel recuperar usuario, é necessário fazer o login novamente.",
        }

        return redirect(`${ROUTES.USER_LOGIN.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action