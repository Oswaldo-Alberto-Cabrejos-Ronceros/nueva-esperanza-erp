import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { PopularService } from '../domain/models/PopularService'

export class GetPopularServices {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<PopularService[]> {
    return await this.service.getPopularServices()
  }
}
