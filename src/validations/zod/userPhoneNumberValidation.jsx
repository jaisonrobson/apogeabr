import * as z from 'zod'
import axios from 'axios'
import { parsePhoneNumberFromString } from "libphonenumber-js"

const parsePhoneNumber = (countryCode) => (phoneNumber) => parsePhoneNumberFromString(phoneNumber, countryCode || "BR")?.isValid()

const checkIfPhoneNumberNotExists = async (phoneNumber) => {
    try {
        const token = localStorage.getItem('token')

        if (token) {
            const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/users/phone_number_exists/phone`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                params: { phone_number: phoneNumber }
            })

            return !response.data.exists
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const validation = (countryCode) => z.string()
    .min(5, { message: "Necessário ao menos 5 caracteres" })
    .max(20, { message: "Máximo de 20 caracteres atingido" })
    .refine(parsePhoneNumber(countryCode), { message: "Numero de telefone inválido" })
    .refine(checkIfPhoneNumberNotExists, { message: "Este telefone já existe em nossa base de dados" })

export default validation