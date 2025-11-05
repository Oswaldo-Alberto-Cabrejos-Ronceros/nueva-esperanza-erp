import type { AppointmentService } from '../domain/services/AppointmentService'

export class DeleteAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentId: number) {
    await this.appointmentService.deleteAppointment(appointmentId)
  }
}
