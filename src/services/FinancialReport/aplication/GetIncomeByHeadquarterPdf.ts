import type { FinancialReportService } from "../domain/services/FinantialReportService";

export class GetIncomeByHeadquarterPdf {
  constructor(private readonly service: FinancialReportService) {}

  async execute(): Promise<Blob> {
    return await this.service.getIncomeByHeadquarterPdf()
  }
}
