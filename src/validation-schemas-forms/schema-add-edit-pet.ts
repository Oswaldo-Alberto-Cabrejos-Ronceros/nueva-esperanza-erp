import * as yup from 'yup'

//dateLimit
const today = new Date();

export const schema = yup.object({
name: yup.string().required("Nombre es obligatorio").max(50,'Nombre debe tener menos de 50 caracteres'),
gender:yup.string().required("Sexo es obligatorio").max(1,'Sexo de tener un caracter'),
weight:yup.number().required('Peso es obligatorio').positive('Peso debe ser positivo').test('max-3-decimals','Peso debe tener como maximo 3 decimales',
  (value)=> value===undefined||/^\d+(\.\d{1,3})?$/.test(value.toString())),
  birthdate:yup.date().max(today,'La fecha debe ser pasada'),
  comment:yup.string(),
  specieId:yup.number().required('Especie es obligatoria'),
  breedId:yup.number().required('Raza es obligatoria'),
  urlImage:yup.string(),
  ownerDni:yup.string().required('El Dni del dueño es obligatorio') .matches(/^\d{8}$/, 'Dni inválido (debe tener 8 dígitos)'),
  ownerFullName:yup.string().required('Busque un dueño'),
  ownerId:yup.number().required()
})

export type FormValues = yup.InferType<typeof schema>
