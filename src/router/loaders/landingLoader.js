import { redirect } from 'react-router-dom'
import axios from 'axios'

import ROUTES from 'router/routes'

const loadData = async ({ request }) => {
    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/news_posts`, {
            headers,
            params: {
                page: 1,
                per_page: 10
            }
        })

        return {
            news: response.data.payload,
            pagination: response.data.pagination,
            isAuthenticated: !!token
        }
    } catch (error) {
        const resultingError = {
            backendError: error?.response?.data || error.message,
            friendlyMessage: "Não foi possível carregar as notícias. Por favor, tente novamente mais tarde."
        }

        return redirect(`${ROUTES.HOME.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default loadData