import * as yup from 'yup'

//dateLimit
const today = new Date()

export const schema = yup.object({
  name: yup
    .string()
    .required('Ups te estás olvidando del nombre')
    .max(50, 'Nombre debe tener menos de 50 caracteres'),
  gender: yup.string().required('Seleccione sexo').max(1, 'Sexo de tener un caracter'),
  birthdate: yup.date().max(today, 'La fecha debe ser pasada'),
  specieId: yup.number().required('Seleccione una especie'),
  breedId: yup.number().required('Seleccione una raza'),
})

export type FormValues = yup.InferType<typeof schema>
