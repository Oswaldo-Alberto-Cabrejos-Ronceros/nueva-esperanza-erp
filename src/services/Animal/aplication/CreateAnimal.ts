import type { AnimalRequest } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class CreateAnimal {
  constructor(private readonly animalService: AnimalService) {}

  async execute(animalRequest: AnimalRequest) {
    await this.animalService.createAnimal(animalRequest)
  }
}
