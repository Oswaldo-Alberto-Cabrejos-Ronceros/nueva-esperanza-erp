import type { AppointmentService } from '../domain/services/AppointmentService'
import type { AppointmentInfoPanelAdmin } from '../domain/models/Appointment'

export class GetAppointmentsByDateForPanelAdmin {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(): Promise<AppointmentInfoPanelAdmin[]> {
    return await this.appointmentService.getAppointmentsByDateForPanelAdmin()
  }
}
