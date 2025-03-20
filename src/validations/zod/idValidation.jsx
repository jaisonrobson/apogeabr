import * as z from 'zod'

const validation = z.coerce.number().int().min(0)

export default validation