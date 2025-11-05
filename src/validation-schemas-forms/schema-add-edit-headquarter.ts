import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required('Nombre es obligatorio')
    .max(50, 'Nombre debe ser menor a 50 caracteres'),
  phone: yup
    .string()
    .required('Teléfono es obligatorio')
    .matches(/^$|^9\d{0,8}$/, 'Celular inválido, debe empezar con 9 y tener 9 dígitos'),
  address: yup
    .string()
    .required('Dirección es obligatoria')
    .max(255, 'Dirección debe ser menor a 255 caracteres'),
  email: yup.string().required('Email es obligatorio').email('Formato de email inválido'),
  district: yup.string().required('Distrito es obligatorio'),
  province: yup.string().required('Provincia es obligatoria'),
  departament: yup.string().required('Departamento es obligatorio'),

  startTime: yup.date().required('La hora de apertura es obligatoria'),

  endTime: yup
    .date()
    .required('La hora de cierre es obligatoria')

    .test(
      'is-after-start',
      'La hora de cierre debe ser posterior a la hora de apertura',
      function (endTime) {
        const { startTime } = this.parent

        if (!startTime || !endTime) return true

        return endTime > startTime
      },
    ),
})

export type FormValues = yup.InferType<typeof schema>
