import * as z from 'zod'

const validation = z.string()
    .min(6, { message: 'Necessário ao menos 6 caracteres' })
    .max(15, { message: 'Máximo de 15 caracteres atingido' })

export default validation