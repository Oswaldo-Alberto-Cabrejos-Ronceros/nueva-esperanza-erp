import type { AnimalService } from '../domain/services/AnimalService'

export class ActivateAnimal {
  constructor(private readonly service: AnimalService) {}

  async execute(animalId: number): Promise<void> {
    await this.service.activateAnimal(animalId)
  }
}
