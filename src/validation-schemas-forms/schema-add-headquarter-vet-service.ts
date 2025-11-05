import * as yup from 'yup'

export const schema = yup.object({
  headquarterId: yup.number().required('La sede es obligatoria'),
  serviceId: yup.number().required('El servicio es obligatorio'),
  simultaneousCapacity: yup.number().required('La capacidad simultanea es obligatoria'),
})
export type FormValues = yup.InferType<typeof schema>
