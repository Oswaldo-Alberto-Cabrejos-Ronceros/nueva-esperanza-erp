import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required('Nombre es obligatorio')
    .max(50, 'Nombre debe tener menos de 50 caracteres'),
  position: yup.number().required('Posición es obligatoria'),
  description: yup
    .string()
    .required('Descripción es obligatoria')
    .max(100, 'Descripción debe tener menos de 100 caracteres'),
})


export type FormValues=yup.InferType<typeof schema>
