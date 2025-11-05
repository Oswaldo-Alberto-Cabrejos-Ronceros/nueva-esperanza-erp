import type { Breed } from '../domain/models/Breed'
import type { BreedService } from '../domain/services/BreedService'

export class GetBreedsBySpecie {
  constructor(private readonly service: BreedService) {}

  async execute(specieId: number): Promise<Breed[]> {
    return await this.service.getBreedsBySpecie(specieId)
  }
}
