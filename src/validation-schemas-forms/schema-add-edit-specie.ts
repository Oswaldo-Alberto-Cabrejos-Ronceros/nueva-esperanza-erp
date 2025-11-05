import * as yup from 'yup'

export const schema = yup.object({
  name:yup.string().required('Nombre es obligatorio').max(50, 'Nombre debe tener menos de 50 caracteres'),
  imagePath:yup.string().required('Imagen es obligatoria')
})

export type FormValues = yup.InferType<typeof schema>
