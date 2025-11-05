
import * as yup from 'yup';
export const schema = yup.object({
  email:yup.string().email("Email invalido").required('El email es obligatorio'),
  password:yup.string().required("La contraseña es obligatoria"),
  type:yup.string().required("Seleccione el tipo")
})

export type FormValues = yup.InferType<typeof schema>
