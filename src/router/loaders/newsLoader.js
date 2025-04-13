import { redirect } from 'react-router-dom'
import axios from 'axios'

import ROUTES from 'router/routes'

const loadData = async ({ request, params }) => {
    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        // Sempre busca a lista de notícias
        const newsListResponse = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/news_posts`, {
            headers,
            params: {
                page: 1,
                per_page: 10
            }
        })

        let specificNews = null

        // Pega o ID da query string
        const url = new URL(request.url)
        const newsId = url.searchParams.get('id')

        // Se tiver ID, busca a notícia específica
        if (newsId) {
            const specificNewsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/news_posts/${newsId}`, {
                headers
            })
            specificNews = specificNewsResponse.data.payload
        }

        return {
            news: newsListResponse.data.payload,
            pagination: newsListResponse.data.pagination,
            specificNews,
            isAuthenticated: !!token
        }
    } catch (error) {
        const resultingError = {
            backendError: error?.response?.data || error.message,
            friendlyMessage: "Não foi possível carregar as notícias. Por favor, tente novamente mais tarde."
        }

        return redirect(`${ROUTES.NEWS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default loadData