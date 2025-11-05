import type { Breed } from '../domain/models/Breed'
import type { BreedService } from '../domain/services/BreedService'

export class GetAllBreeds {
  constructor(private readonly breedService: BreedService) {}

  async execute(): Promise<Breed[]> {
    return await this.breedService.getAllBreeds()
  }
}
