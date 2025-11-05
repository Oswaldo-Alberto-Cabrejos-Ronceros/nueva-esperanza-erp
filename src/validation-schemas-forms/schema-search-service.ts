
import * as yup from 'yup'

export const schema = yup.object({
    name:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    specieId:yup.string().nullable(),
    categoryId:yup.string().nullable(),
    status:yup.boolean()
})

export type FormValues = yup.InferType<typeof schema>

