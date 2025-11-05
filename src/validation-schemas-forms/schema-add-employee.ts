import * as yup from 'yup'
import { subYears } from 'date-fns'

const dateLimit = subYears(new Date(), 18)

export const schema = yup.object({
  dni: yup
    .string()
    .required('Dni es obligatorio')
    .matches(/^\d{8}$/, 'Dni inválido (debe tener 8 dígitos)'),
  cmvp: yup.string().matches(/^\d{0,5}$/, 'CMVP debe tener hasta 5 dígitos numéricos'),
  names: yup.string().required('Nombres es obligatorio').max(50, 'Nombres debe tener menos de 50 dígitos'),
  lastnames: yup.string().required('Apellidos es obligatorio').max(50, 'Nombres debe tener menos de 50 dígitos'),
  address: yup.string().required('La dirección es obligatoria'),
  phone: yup
    .string()
    .required('El celular es obligatorio')
    .matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
  dirImage: yup.string().required('La imagen es obligatoria'),
  headquarterId: yup.number().required('La sede es obligatorio'),
  birthdate: yup.date().required('La fecha es obligatorio').max(dateLimit,'Debe de haber nacido hace 18 años'),
  roleId: yup.number().required('El rol es obligatorio'),
  email: yup.string().email('Email invalido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Debe confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})
export type FormValues = yup.InferType<typeof schema>
