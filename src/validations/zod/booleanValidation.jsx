import * as z from 'zod'

const validation = z.number().int().min(0).max(1)

export default validation