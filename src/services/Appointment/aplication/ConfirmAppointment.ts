import type { AppointmentService } from '../domain/services/AppointmentService'

export class ConfirmAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentId: number) {
    return await this.appointmentService.confirmAppointment(appointmentId)
  }
}
