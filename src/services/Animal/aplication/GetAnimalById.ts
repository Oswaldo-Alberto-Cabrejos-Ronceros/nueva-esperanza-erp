import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class GetAnimalById {
  constructor(private readonly animalService: AnimalService) {}
  async execute(animalId: number): Promise<Animal> {
    return await this.animalService.getAnimalById(animalId)
  }
}
