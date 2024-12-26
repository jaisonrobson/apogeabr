import * as z from 'zod'

const userPasswordValidation = z.string()
    .min(8, { message: 'Necessário ao menos 8 caracteres' })
    .max(15, { message: 'Máximo de 15 caracteres atingido' })
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        {
            message: `
            <p>A senha deve incluir: </p>
            <ul>
                <li>Pelo menos 8 caracteres</li>
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
                <li>Um caractere especial</li>
            </ul>
            `
        }
    )

export default userPasswordValidation