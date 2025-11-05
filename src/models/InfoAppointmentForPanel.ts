export interface InfoAppointmentForPanel {
  id: number
  timeAppointment: string
  comment: string
  service: {
    id: number
    time: number
    name: string
  }
  employee: {
    id: number
    name: string
    role: string
  }
}
