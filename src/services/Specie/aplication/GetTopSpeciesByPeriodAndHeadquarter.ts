import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { SpecieService } from '../domain/services/SpecieService'
import type {  TopSpeciesCare } from '../domain/models/Specie'

export class GetTopSpeciesByPeriodAndHeadquarter {
  constructor(private readonly specieService: SpecieService) {}

  execute(period: ReportPeriod, headquarterId: number): Promise<TopSpeciesCare> {
    return this.specieService.getTopSpeciesByPeriodAndHeadquarter(period, headquarterId)
  }
}
