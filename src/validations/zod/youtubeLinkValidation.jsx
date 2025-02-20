import * as z from 'zod'

const validation = z.string()
    .regex(
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+(&\S*)?$/,
        {
            message: "O campo deve ser um link do youtube válido."
        }
    )

export default validation