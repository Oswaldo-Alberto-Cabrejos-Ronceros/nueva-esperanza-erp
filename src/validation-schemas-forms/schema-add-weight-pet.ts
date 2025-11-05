import * as yup from 'yup'

export const schema = yup.object({
  weight: yup.number().required('Ingrese el peso').max(1000, 'Máximo 1000 Kg'),
})
export type FormValues = yup.InferType<typeof schema>
