import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie, SpecieRequest } from '../domain/models/Specie'

export class CreateSpecie {
  constructor(private readonly service: SpecieService) {}

  async execute(specieRequest: SpecieRequest): Promise<Specie> {
    return await this.service.createSpecie(specieRequest)
  }
}
