import axios from 'axios'
import _ from 'lodash'
import { redirect } from 'react-router-dom'

export const loadAction = async ({
    actionMethod = "GET",
    actionRoute = "",
    payload: requestPayload = undefined,
    responsePayloadPath = ["data", "payload"],
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
                ...(requestPayload !== undefined ? { data: requestPayload } : {})
            })

            result = { ...result, payload: _.get(response, responsePayloadPath) }
        } catch (error) {
            result = { ...result, error: `Erro na requisição ${actionRoute}.` }
        }
    }

    return result
}