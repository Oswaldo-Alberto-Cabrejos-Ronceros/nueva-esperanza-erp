import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export interface FinancialReportService {
  getIncomeByPeriod(period: ReportPeriod): Promise<Blob>
  getIncomeByServicePdf(): Promise<Blob>
  getIncomeBySpeciePdf(): Promise<Blob>
  getIncomeByPaymentMethodExcel(): Promise<Blob>
  getIncomeByPeriodAndServicePdf(period: ReportPeriod): Promise<Blob>
  getIncomeByHeadquarterPdf(): Promise<Blob>
    getIncomeByPeriodAndServicePdf(period: ReportPeriod): Promise<Blob>
  getIncomeByHeadquarterPeriodPdf(period: ReportPeriod): Promise<Blob>
}
