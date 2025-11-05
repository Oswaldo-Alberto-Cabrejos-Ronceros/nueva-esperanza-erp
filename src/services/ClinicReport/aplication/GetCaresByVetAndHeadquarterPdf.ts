import type { ClinicReportService } from "../domain/services/ClinicReportService";

export class GetCaresByVetAndHeadquarterPdf {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<Blob> {
    return this.service.getCaresByVetAndHeadquarterPdf()
  }
}
