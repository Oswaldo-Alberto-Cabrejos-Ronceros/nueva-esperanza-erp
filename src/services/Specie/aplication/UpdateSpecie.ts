import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie, SpecieRequest } from '../domain/models/Specie'

export class UpdateSpecie {
  constructor(private readonly service: SpecieService) {}

  async execute(specieId: number, specieRequest:SpecieRequest): Promise<Specie> {
    return await this.service.updateSpecie(specieId, specieRequest)
  }
}
