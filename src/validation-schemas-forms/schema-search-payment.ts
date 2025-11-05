import * as yup from 'yup'

const dateLimit = new Date()

export const schema = yup.object({
  dni: yup.string().matches(/^\d{0,8}$/, 'DNI debe tener hasta 8 dígitos numéricos'),
  headquarterId: yup.number(),
  serviceId: yup.number(),
  status: yup.string(),
  startDate: yup
    .date()
    .max(dateLimit, 'La fecha debe ser máximo de hoy')
    .nullable()
    .test(
      'fecha-inicio-anterior',
      'La fecha de inicio no puede ser posterior a la fecha fin',
      function (value) {
        const { endDate } = this.parent
        if (!value || !endDate) return true
        return value <= endDate
      },
    ),
  endDate: yup
    .date()
    .max(dateLimit, 'La fecha debe ser máximo de hoy')
    .nullable()
    .test(
      'fecha-fin-posterior',
      'La fecha de fin no puede ser anterior a la fecha inicio',
      function (value) {
        const { startDate } = this.parent
        if (!value || !startDate) return true
        return value >= startDate
      },
    ),
})

export type FormValues = yup.InferType<typeof schema>
