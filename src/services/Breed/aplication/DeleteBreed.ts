import type { BreedService } from '../domain/services/BreedService'

export class DeleteBreed {
  constructor(private readonly service: BreedService) {}

  async execute(id: number): Promise<void> {
    await this.service.deleteBreed(id)
  }
}
