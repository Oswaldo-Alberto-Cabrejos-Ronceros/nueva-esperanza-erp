import type { CareService } from '@/services/Care/domain/services/CareService'
import type { CareStatsToday } from '../domain/models/Care'

export class GetCareStatsToday {
  constructor(private readonly careService: CareService) {}

  async execute(headquarterId:number): Promise<CareStatsToday> {
    return await this.careService.getCareStatsToday(headquarterId)
  }
}
