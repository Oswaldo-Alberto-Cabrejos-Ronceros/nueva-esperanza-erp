import * as yup from 'yup';

export const schema = yup.object({
    dni: yup.string().max(8, 'DNI debe tener hasta 8 dígitos numéricos'),
    names:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    lastnames:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    status:yup.boolean(),
    headquarterId:yup.number()
})

export type FormValues = yup.InferType<typeof schema>
