import * as z from 'zod'

const validation = z.coerce.number().nonnegative()

export default validation