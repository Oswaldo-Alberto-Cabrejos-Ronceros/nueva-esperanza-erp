import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class GetAllAnimals {
  constructor(private readonly animalService: AnimalService) {}
  async execute(): Promise<Animal[]> {
    return await this.animalService.getAllAnimals()
  }
}
