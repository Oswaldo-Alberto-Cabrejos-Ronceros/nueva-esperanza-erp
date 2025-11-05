import * as yup from 'yup'
import { subYears } from 'date-fns'

const dateLimit = subYears(new Date(), 18)

export const schema = yup.object({
  dni: yup
    .string()
    .required('Dni es obligatorio')
    .matches(/^\d{8}$/, 'Dni inválido (debe tener 8 dígitos)'),
  names: yup
    .string()
    .required('Nombres es obligatorio')
    .max(50, 'Nombres debe tener menos de 50 dígitos'),
  lastnames: yup
    .string()
    .required('Apellidos es obligatorio')
    .max(50, 'Nombres debe tener menos de 50 dígitos'),
  phone: yup
    .string()
    .required('El celular es obligatorio')
    .matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
  address: yup.string().required('La dirección es obligatoria'),
  birthdate: yup
    .date()
    .required('La fecha es obligatorio')
    .max(dateLimit, 'Debe de haber nacido hace 18 años'),
  headquarterId: yup.number().required('La sede es obligatorio'),
  withUser: yup.boolean().required('Seleccione si es con usuario o no'),
  email: yup
    .string()
    .email('Email invalido')
    .when('withUser', {
      is: true,
      then: (schema) => schema.required('El email es obligatorio'),
      otherwise: (schema) => schema.notRequired(),
    }),
  password: yup.string().when('withUser', {
    is: true,
    then: (schema) => schema.required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
    otherwise: (schema) => schema.notRequired(),
  }),
  confirmPassword: yup.string().when('withUser', {
    is: true,
    then: (schema) =>
      schema
        .required('Debe confirmar la contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
    otherwise: (schema) => schema.notRequired(),
  }),
})
export type FormValues = yup.InferType<typeof schema>
