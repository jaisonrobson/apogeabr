import * as z from 'zod'

const validation = z.string()
    .min(2, "O texto deve ter pelo menos 2 caracteres.")
    .max(300, "O texto deve ter no máximo 300 caracteres.")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O texto deve conter apenas caracteres alfabéticos.")

export default validation