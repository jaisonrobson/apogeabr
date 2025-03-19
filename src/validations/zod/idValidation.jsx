import * as z from 'zod'

const validation = z.number().int().min(0)

export default validation