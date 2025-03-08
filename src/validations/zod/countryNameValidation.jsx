import * as z from 'zod'

const validation = z.string()
    .min(3, { message: 'Necessário ao menos 3 caracteres' })
    .max(25, { message: 'Máximo de 25 caracteres atingido' })

export default validation