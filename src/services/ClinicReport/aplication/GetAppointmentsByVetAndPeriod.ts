import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { AppointmentsByVetAndPeriod } from '../domain/models/AppointmentsByVetAndPeriod'

export class GetAppointmentsByVetAndPeriod {
  constructor(private readonly service: ClinicReportService) {}

  async execute(period: ReportPeriod): Promise<AppointmentsByVetAndPeriod[]> {
    return await this.service.getAppointmentsByVetAndPeriod(period)
  }
}
