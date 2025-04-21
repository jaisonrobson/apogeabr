import * as z from 'zod'

const sqidCodeValidation = z
    .string()
    .min(8, 'O código deve ter no mínimo 8 caracteres')
    .regex(
        /^[a-zA-Z0-9]+$/,
        'O código deve conter apenas letras e números'
    )

export default sqidCodeValidation 