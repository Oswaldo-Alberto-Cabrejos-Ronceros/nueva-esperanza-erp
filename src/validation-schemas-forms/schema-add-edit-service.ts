import * as yup from 'yup'

export const schema = yup.object({
name:yup.string().required('Nombre es obligatorio').max(50,'Nombre debe tener menos de 50 caracteres'),
description:yup.string().required("Descripción es obligatorio"),
price:yup.number().required('Precio es obligatorio').positive('Precio debe ser negativo').test('precio','Debe tener como máximo 6 enteros y 2 decimales',
  (value)=>value===undefined || /^\d{1,6}(\.\d{1,3})?$/.test(value.toString())
),
duration:yup.number().required('Duracion es obligatoria').integer("Debe ser un numero entero"),
dirImage:yup.string(),
specieId:yup.number().required('Especie es obligatorio'),
categoryId:yup.number().required("Categoria es obligatoria"),
})

export type FormValues=yup.InferType<typeof schema>
