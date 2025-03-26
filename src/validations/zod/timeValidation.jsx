import * as z from 'zod'

const validation = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Horário inválido. Use o formato HH:MM (24h)."
})

export default validation