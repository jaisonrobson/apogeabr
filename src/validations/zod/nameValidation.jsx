import * as z from 'zod'

const validation = z.string()
    .min(6, { message: 'Necessário ao menos 6 caracteres' })
    .max(15, { message: 'Máximo de 15 caracteres atingido' })
    .regex(
        /^(?=(?:.*[a-zA-Z]){4,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]{6,15}$/,
        {
            message: `
            <p>O campo deve incluir: </p>
            <ul>
                <li>Pelo menos 4 caracteres alfabéticos</li>
                <li>Entre 6 a 15 caracteres</li>
            </ul>
            `
        }
    )

export default validation