import * as yup from 'yup'

export const schema = yup.object({
  address: yup.string().max(255, 'Dirección debe ser menor a 255 caracteres'),
  name:yup.string().max(50,'Nombre debe ser menos a 50 caracteres'),
  province:yup.string(),
  district: yup.string(),
  phone: yup
    .string()
    .matches(/^$|^9\d{0,8}$/, 'Celular inválido, debe empezar con 9 y como máximo 9 dígito'),
  email: yup.string().email('Formato de email inválido'),
  status:yup.boolean()
})

export type FormValues = yup.InferType<typeof schema>
