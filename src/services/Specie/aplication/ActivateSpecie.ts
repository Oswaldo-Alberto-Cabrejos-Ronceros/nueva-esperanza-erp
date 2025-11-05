import type { SpecieService } from '../domain/services/SpecieService'

export class ActivateSpecie {
  constructor(private readonly service: SpecieService) {}

  async execute(id: number): Promise<void> {
    await this.service.activateSpecie(id)
  }
}
