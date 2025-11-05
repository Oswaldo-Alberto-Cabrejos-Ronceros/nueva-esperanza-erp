import type { ClientInfoForAppointment } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetClientInfoForAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(appointmentId: number): Promise<ClientInfoForAppointment> {
    return await this.appointmentService.getClientInfo(appointmentId)
  }
}
