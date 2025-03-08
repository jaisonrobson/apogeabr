import * as z from 'zod'

const validation = z.string()
    .regex(
        /^[a-z]{2}-[A-Z]{2}$/,
        {
            message: `
            <p>O campo deve incluir na respectiva ordem: </p>
            <ul>
                <li>Duas letras minusculas</li>
                <li>Duas letras maíusculas</li>
            </ul>
            `
        }
    )

export default validation