import * as yup from 'yup'

export const schema = yup.object({
  name:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  ownerDni:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  specie:yup.string(),
  breed:yup.string(),
  gender:yup.string().max(1),
  status:yup.boolean()
})

export type FormValues = yup.InferType<typeof schema>
