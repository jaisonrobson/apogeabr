import * as z from 'zod'

const validation = z.number()
    .min(0, { message: 'Valor minimo deve ser 0' })
    .max(999999, { message: 'Valor máximo atingido' })
    .optional()

export default validation