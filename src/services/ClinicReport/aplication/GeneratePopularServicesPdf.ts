import type { ClinicReportService } from '../domain/services/ClinicReportService'

export class GeneratePopularServicesPdf {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<Blob> {
    return await this.service.generatePopularServicesPdf()
  }
}
