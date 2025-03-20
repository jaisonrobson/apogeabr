import * as z from 'zod'

const validation = z.coerce.number()
    .int()

export default validation