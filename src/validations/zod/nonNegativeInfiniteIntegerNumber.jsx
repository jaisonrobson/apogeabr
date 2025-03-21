import * as z from 'zod'

const validation = z.coerce.number().int().nonnegative()

export default validation