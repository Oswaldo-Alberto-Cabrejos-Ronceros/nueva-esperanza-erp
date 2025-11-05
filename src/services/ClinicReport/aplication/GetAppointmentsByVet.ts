import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { AppointmentsByVet } from '../domain/models/AppointmentsByVet'

export class GetAppointmentsByVet {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<AppointmentsByVet[]> {
    return await this.service.getAppointmentsByVet()
  }
}
