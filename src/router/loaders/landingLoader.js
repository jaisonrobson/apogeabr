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
        const [newsResponse, presentationsResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/news_posts`, {
                headers,
                params: {
                    page: 1,
                    per_page: 10
                }
            }),
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/presentations`, {
                headers,
                params: {
                    page: 1,
                    per_page: 10
                }
            })
        ])

        return {
            news: newsResponse.data.payload,
            newsPagination: newsResponse.data.pagination,
            presentations: presentationsResponse.data.payload,
            presentationsPagination: presentationsResponse.data.pagination,
            isAuthenticated: !!token
        }
    } catch (error) {
        const resultingError = {
            backendError: error?.response?.data || error.message,
            friendlyMessage: "Não foi possível carregar as informações. Por favor, tente novamente mais tarde."
        }

        return redirect(`${ROUTES.HOME.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default loadData