import type { BreedService } from '../domain/services/BreedService'
import type { Breed } from '../domain/models/Breed'

export class GetBreedById {
  constructor(private readonly service: BreedService) {}

  async execute(id: number): Promise<Breed> {
    return await this.service.getBreedById(id)
  }
}
