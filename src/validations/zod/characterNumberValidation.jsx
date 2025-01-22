import * as z from 'zod'
import _ from 'lodash'

const isNumber = (value) => _.isNumber(value)

const validation = z.string()
    .refine(value => !isNaN(parseFloat(value)), "Numero invalido")
    .transform(value => parseFloat(value))
    .refine(num => num >= 0, "O numero deve ser maior que zero")
    .refine(num => num < 999999, "Valor maximo atingido")
    .optional()

export default validation