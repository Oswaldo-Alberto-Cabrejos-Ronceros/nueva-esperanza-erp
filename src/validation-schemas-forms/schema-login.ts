
import * as yup from 'yup';
export const schema = yup.object({
  email:yup.string().email("Email invalido").required('El email es obligatorio'),
  password:yup.string().required("La contraseña es obligatoria")
})

export type FormValues = yup.InferType<typeof schema>
