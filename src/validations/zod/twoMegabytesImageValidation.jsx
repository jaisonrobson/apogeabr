import * as z from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"]

const checkAcceptedFileTypes = (file) => ACCEPTED_IMAGE_TYPES.includes(file.type)
const checkFileMaxSize = (file) => file.size <= MAX_FILE_SIZE

const validation = z.instanceof(File)
    .refine(checkAcceptedFileTypes, "É aceito apenas imagens do tipo: JPEG ou PNG")
    .refine(checkFileMaxSize, "O tamanho da imagem não pode exceder 2MB")

export default validation