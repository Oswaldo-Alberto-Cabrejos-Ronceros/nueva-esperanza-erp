import type { PageResponse } from '@/services/models/PageResponse'
import type { HeadquarterServiceInfoPanel } from '../domain/models/HeadquarterVetService'
import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class FilterHeadquarterVetServices {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}

  execute(
    page: number,
    size: number,
    filters: {
      serviceName?: string
      categoryId?: number
      speciesId?: number
      headquarterId?: number
    },
  ): Promise<PageResponse<HeadquarterServiceInfoPanel>> {
    return this.headquarterVetService.filterHeadquarterServices(page, size, filters)
  }
}
