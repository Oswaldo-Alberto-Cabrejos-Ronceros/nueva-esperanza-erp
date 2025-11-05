import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().max(50, 'Nombre debe tener menos de 50 caracteres'),
  specieId: yup.number().nullable(),
  status:yup.boolean()
})

export type FormValues = yup.InferType<typeof schema>
