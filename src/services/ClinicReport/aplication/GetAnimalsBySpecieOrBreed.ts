import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { AnimalByType } from '../domain/models/AnimalByType'

export class GetAnimalsBySpecieOrBreed {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<AnimalByType[]> {
    return await this.service.getAnimalsBySpecieOrBreed()
  }
}
