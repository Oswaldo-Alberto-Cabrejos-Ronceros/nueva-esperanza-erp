import type { ReportPeriod } from "@/services/enums/ReportPeriod";
import type { FinancialReportService } from "../domain/services/FinantialReportService";

export class GetIncomeByHeadquarterPeriodPdf {
  constructor(private readonly financialReportService: FinancialReportService) {}

  execute(period: ReportPeriod): Promise<Blob> {
    return this.financialReportService.getIncomeByHeadquarterPeriodPdf(period)
  }
}
