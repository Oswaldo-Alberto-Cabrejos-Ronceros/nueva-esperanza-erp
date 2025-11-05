import type { SearchBreedParams } from '../domain/models/SearchBreedParams'
import type { PageResponse } from '@/services/models/PageResponse'
import type { BreedList } from '../domain/models/Breed'
import type { BreedService } from '../domain/services/BreedService'

export class SearchBreeds {
  constructor(private readonly service: BreedService) {}

  execute(params: SearchBreedParams): Promise<PageResponse<BreedList>> {
    return this.service.searchBreeds(params)
  }
}
