import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { AppointmentsByTime } from '../domain/models/AppointmentsByTime'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export class GetAppointmentsByPeriod {
  constructor(private readonly service: ClinicReportService) {}

  async execute(period: ReportPeriod): Promise<AppointmentsByTime[]> {
    return await this.service.getAppointmentsByPeriod(period)
  }
}
