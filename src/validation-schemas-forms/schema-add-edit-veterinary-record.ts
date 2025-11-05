import * as yup from 'yup'

export const schema = yup.object({
  careId: yup
    .number()
    .required('El cita es obligatorio')
    .moreThan(0, 'El cita es obligatorio'),
  employeeId: yup
    .number()
    .required('El empleado es obligatorio')
    .moreThan(0, 'El empleado es obligatorio'),
  dateCreate:yup.date().required('Fecha es obligatoria'),
  diagnosis:yup.string().required('El diagnostico es obligatorio'),
  treatment:yup.string().required('El tratamiento es obligatorio'),
  observation:yup.string().required('La obsevación es obligatorio'),
  resultUrl:yup.string(),
  status:yup.string()

})
export type FormValues = yup.InferType<typeof schema>
