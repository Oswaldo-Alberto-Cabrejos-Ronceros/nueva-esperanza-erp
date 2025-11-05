import type { BreedService } from '../domain/services/BreedService'
import type { Breed, BreedRequest } from '../domain/models/Breed'

export class CreateBreed {
  constructor(private readonly service: BreedService) {}

  async execute(breedRequest: BreedRequest): Promise<Breed> {
    return await this.service.createBreed(breedRequest)
  }
}
