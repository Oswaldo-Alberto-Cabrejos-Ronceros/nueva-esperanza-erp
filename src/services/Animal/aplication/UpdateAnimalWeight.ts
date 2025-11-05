import type { AnimalService } from '../domain/services/AnimalService'

export class UpdateAnimalWeight {
  constructor(private readonly service: AnimalService) {}

  async execute(id: number, weight: number): Promise<{ name: string; weight: number }> {
    return this.service.updateAnimalWeight(id, weight)
  }
}
