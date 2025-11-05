import type { BreedService } from '../domain/services/BreedService'

export class ActivateBreed {
  constructor(private readonly service: BreedService) {}

  async execute(breedId: number): Promise<void> {
    await this.service.activateBreed(breedId)
  }
}
