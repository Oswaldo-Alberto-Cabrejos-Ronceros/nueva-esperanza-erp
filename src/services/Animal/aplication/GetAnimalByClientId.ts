import type { AnimalByClient } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class GetAnimalByClientId {
  constructor(private readonly animalService: AnimalService) {}
  async execute(clientId: number): Promise<AnimalByClient[]> {
    return await this.animalService.getAnimalByClientId(clientId)
  }
}
