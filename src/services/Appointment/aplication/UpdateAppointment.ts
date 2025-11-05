import type { AppointmentRequest } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class UpdateAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentId: number, appointmentRequest: AppointmentRequest) {
    return await this.appointmentService.updateAppointment(appointmentId, appointmentRequest)
  }
}
