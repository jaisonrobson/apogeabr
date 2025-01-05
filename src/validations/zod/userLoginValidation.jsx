import * as z from 'zod'

const userLoginValidation = z.string()
    .min(8, { message: 'Necessário ao menos 8 caracteres' })
    .max(15, { message: 'Máximo de 15 caracteres atingido' })
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/,
        {
            message: `
            <p>O login deve incluir: </p>
            <ul>
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
                <li>Um caractere especial</li>
            </ul>
            `
        }
    )

export default userLoginValidation