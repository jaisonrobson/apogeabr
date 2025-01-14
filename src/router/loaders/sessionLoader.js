import { redirect } from 'react-router-dom'
import axios from 'axios'

import ROUTES from 'router/routes'

const loadData = async ({ request }) => {
    let session = { token: localStorage.getItem('token') }

    if (session?.token) {
        try {
            const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/users/current_logged_user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`,
                }
            })

            session = { ...session, user: response.data.user }
        } catch (error) {
            localStorage.removeItem('token')

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

    return session
}

export default loadData