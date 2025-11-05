import type { FinancialReportService } from "../domain/services/FinantialReportService";

export class GetIncomeByServicePdf {
  constructor(private readonly service: FinancialReportService) {}

  async execute(): Promise<Blob> {
    return await this.service.getIncomeByServicePdf()
  }
}
