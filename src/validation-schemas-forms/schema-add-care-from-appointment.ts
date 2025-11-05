import * as yup from 'yup'

export const schema = yup.object({
  appointmentId: yup.number().required('La cita es obligatoria es obligatorio'),
  employeeId: yup.number().required('El empleado es obligatorio'),
})
export type FormValues = yup.InferType<typeof schema>
