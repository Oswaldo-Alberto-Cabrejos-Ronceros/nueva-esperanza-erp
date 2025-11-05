import * as yup from 'yup';

export const schema = yup.object({
  dni: yup.string().max(8,'DNI debe tener hasta 8 dígitos numéricos'),
  cmvp:yup.string().max(5, 'CMVP debe tener hasta 5 dígitos numéricos'),
  names:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  lastnames:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  rol:yup.string(),
  headquarter:yup.string(),
  status:yup.boolean().required('Estado es obligatorio')
})

export type FormValues = yup.InferType<typeof schema>

