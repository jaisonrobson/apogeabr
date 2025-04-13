import axios from 'axios'
import _ from 'lodash'
import { redirect } from 'react-router-dom'

const getHeaders = () => {
    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return headers
}

export const loadAction = async ({
    actionMethod = "GET",
    actionRoute = "",
    payload: requestPayload = undefined,
    responsePayloadPath = ["data", "payload"],
}) => {
    try {
        const response = await axios.request({
            url: `${process.env.REACT_APP_BACKEND_HOST}/${actionRoute}`,
            method: actionMethod,
            headers: getHeaders(),
            ...(requestPayload !== undefined ? { data: requestPayload } : {})
        })

        return { 
            payload: _.get(response, responsePayloadPath),
            token: localStorage.getItem('token')
        }
    } catch (error) {
        console.error(`Erro na requisição ${actionRoute}:`, error)
        return { 
            error: `Erro na requisição ${actionRoute}.`,
            token: localStorage.getItem('token')
        }
    }
}