
import * as yup from 'yup';
import { subYears } from 'date-fns'
const dateLimit = subYears(new Date(), 18)

export const schema = yup.object({
  dni: yup.string().required('El DNI es obligatorio').matches(/^\d{8}$/, 'DNI inválido (8 dígitos)'),
  names: yup.string().required('Los nombres son obligatorios'),
  lastnames: yup.string().required('Los apellidos son obligatorios'),
  email: yup.string().required('El email es obligatorio').email('Formato de email inválido'),
  address: yup.string().required('La dirección es obligatoria'),
  phone: yup.string().required('El celular es obligatorio').matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
  birthdate: yup.date().required('La fecha es obligatorio').max(dateLimit,'Debe de haber nacido hace 18 años'),
  headquarter:yup.number().required('La sede es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup.string()
    .required('Debe confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  term: yup.boolean().oneOf([true], 'Debe aceptar los términos')
})

export type FormValues = yup.InferType<typeof schema>
