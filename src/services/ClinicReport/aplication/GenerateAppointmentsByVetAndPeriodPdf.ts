import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export class GenerateAppointmentsByVetAndPeriodPdf {
  constructor(private readonly service: ClinicReportService) {}

  async execute(period: ReportPeriod): Promise<Blob> {
    return await this.service.generateAppointmentsByVetAndPeriodPdf(period)
  }
}
