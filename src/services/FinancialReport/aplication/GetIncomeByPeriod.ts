import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { FinancialReportService } from '../domain/services/FinantialReportService'

export class GetIncomeByPeriod {
  constructor(private readonly service: FinancialReportService) {}

  async execute(period: ReportPeriod): Promise<Blob> {
    return await this.service.getIncomeByPeriod(period)
  }
}
