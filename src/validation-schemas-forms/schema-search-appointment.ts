import * as yup from 'yup'

export const schema = yup.object({
  headquarter: yup.string().notRequired(),
  category: yup.string().notRequired(),
  date: yup.date().notRequired(),
  status: yup.string().notRequired(),
})

export type FormValues = yup.InferType<typeof schema>
