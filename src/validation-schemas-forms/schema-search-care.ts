import * as yup from 'yup'

export const schema = yup.object({
  headquarterId: yup.number().notRequired(),
  headquarterServiceId: yup.number().notRequired(),
  date: yup.date().notRequired(),
  status: yup.string().notRequired(),
})

export type FormValues = yup.InferType<typeof schema>

