import * as yup from 'yup'

export const schema = yup.object({
  scheduleDateTime: yup.string().required('El horario es obligatorio'),
  date:yup.date().min(new Date(new Date().setHours(0, 0, 0, 0)),'La fecha debe ser posterior').required('Fecha es obligatoria'),
  comment: yup.string(),
  headquarterVetServiceId: yup.number().required('El servicio es obligatorio'),
  ownerDni:yup.string().matches(/^\d{8}$/, 'Dni inválido (debe tener 8 dígitos)'),
  ownerId:yup.number().required('El animal es obligatorio').required('DNI es obligatorio'),
  ownerName:yup.string().required('Busque un cliente'),
  petId: yup.number().required('El animal es obligatorio'),
  paymentMethodId: yup.number().required('El metodo de pago es obligatorio'),
})
export type FormValues = yup.InferType<typeof schema>
