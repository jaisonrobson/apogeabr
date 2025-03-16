import axios from 'axios'
import _ from 'lodash'
import { redirect } from 'react-router-dom'

export const loadAction = async ({
    actionMethod = "GET",
    actionRoute = "",
    payload = undefined,
}) => {
    let result = { token: localStorage.getItem('token') }

    if (result?.token) {
        try {
            const response = await axios.request({
                url: `${process.env.REACT_APP_BACKEND_HOST}/${actionRoute}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${result.token}`,
                },
                ...(payload !== undefined ? { data: payload } : {})
            })

            result = { ...result, payload: response.data.payload }
        } catch (error) {
            result = { ...result, error: `Erro na requisição ${actionRoute}.` }
        }
    }

    return result
}