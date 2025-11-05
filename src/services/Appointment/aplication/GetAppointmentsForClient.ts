import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetAppointmentsForClient {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(clientId: number) {
    return this.appointmentService.getAppointmentsForClient(clientId)
  }
}
