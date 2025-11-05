import type { BreedService } from '../domain/services/BreedService'
import type { Breed, BreedRequest } from '../domain/models/Breed'

export class UpdateBreed {
  constructor(private readonly service: BreedService) {}

  async execute(id: number, breedRequest: BreedRequest): Promise<Breed> {
    return await this.service.updateBreed(id, breedRequest)
  }
}
