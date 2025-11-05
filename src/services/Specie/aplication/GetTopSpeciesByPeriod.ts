import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { SpecieService } from '../domain/services/SpecieService'
import type { TopSpeciesCare } from '../domain/models/Specie'

export class GetTopSpeciesByPeriod {
  constructor(private readonly specieService: SpecieService) {}

  execute(period: ReportPeriod): Promise<TopSpeciesCare> {
    return this.specieService.getTopSpeciesByPeriod(period)
  }
}
