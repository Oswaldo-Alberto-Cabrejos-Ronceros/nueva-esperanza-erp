import type { AppointmentService } from '../domain/services/AppointmentService'
import type { AppointmentInfoPanelAdmin } from '../domain/models/Appointment'

export class GetAppointmentsByDateForPanelManager {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(headquarterId: number): Promise<AppointmentInfoPanelAdmin[]> {
    return await this.appointmentService.getAppointmentsByDateForPanelManager(headquarterId)
  }
}
