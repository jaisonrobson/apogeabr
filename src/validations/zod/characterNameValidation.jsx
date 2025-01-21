import * as z from 'zod'
import axios from 'axios'

const checkIfValidNameExists = async (name) => {
    try {
        const validEntry = name === "" ? { name: "" } : { name }

        const response = await axios.get(
            `${[process.env.REACT_APP_BACKEND_HOST]}/characters/character_name_exists/bycharactername`,
            {
                params: { ...validEntry },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )

        return !response.data.exists
    } catch (error) {
        if (error.status === 400)
            return false

        throw new Error("Erro ao validar nome, o servidor não responde.")
    }
}

const validation = z.string()
    .min(1, { message: 'Necessário ao menos 1 caractere' })
    .max(30, { message: 'Máximo de 30 caracteres atingido' })
    .refine(checkIfValidNameExists, "Este nome já foi validado em nossa base de dados")

export default validation