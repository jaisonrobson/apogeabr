import * as z from 'zod'
import axios from 'axios'

const checkIfEmailNotExists = async (email) => {
    try {
        const validEntry = email === "" ? { email: "validEntry" } : { email }

        const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/users/email_exists/email`, { params: { ...validEntry } })

        return !response.data.exists
    } catch (error) {
        throw new Error("Erro ao validar email, o servidor não responde.")
    }
}

const validation = z.string()
    .min(1, { message: "Necessário ao menos 1 caractere" })
    .email("Email não é válido")
    .refine(checkIfEmailNotExists, "Este email já existe em nossa base de dados")

export default validation