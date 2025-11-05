import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetAppointmentPanelInfo {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentId: number) {
    return this.appointmentService.getAppointmentPanelInfo(appointmentId)
  }
}
