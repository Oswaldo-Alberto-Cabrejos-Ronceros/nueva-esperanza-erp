import type { ClinicReportService } from '../domain/services/ClinicReportService'

export class GenerateAnimalsBySpecieOrBreedPdf {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<Blob> {
    return await this.service.generateAnimalsBySpecieOrBreedPdf()
  }
}
