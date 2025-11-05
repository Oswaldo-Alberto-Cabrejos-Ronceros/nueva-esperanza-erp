import * as yup from 'yup'

export const schema = yup.object({
  period:yup.string().required('El periodo es obligatorio')
})

export type FormValues = yup.InferType<typeof schema>
