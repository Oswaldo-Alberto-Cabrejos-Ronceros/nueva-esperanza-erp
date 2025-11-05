import * as yup from 'yup'

export const schema = yup.object({
  simultaneousCapacity: yup.number().required('La capacidad simultanea es obligatoria'),
  status: yup.boolean().required('El estado es obligatorio'),
})
export type FormValues = yup.InferType<typeof schema>
