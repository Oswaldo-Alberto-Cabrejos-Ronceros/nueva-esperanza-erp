import * as yup from 'yup'
export const schema = yup.object({
  blockNote: yup.string().required('El motivo de bloqueo es obligatiorio'),
})
export type FormValues = yup.InferType<typeof schema>
