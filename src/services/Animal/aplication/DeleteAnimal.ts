import type { AnimalService } from '../domain/services/AnimalService'

export class DeleteAnimal {
  constructor(private readonly animalService: AnimalService) {}
  async execute(animalId: number) {
    await this.animalService.deleteAnimal(animalId)
  }
}
