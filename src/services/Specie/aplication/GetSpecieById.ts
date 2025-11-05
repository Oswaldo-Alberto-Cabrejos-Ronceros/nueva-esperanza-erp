import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie } from '../domain/models/Specie'

export class GetSpecieById {
  constructor(private readonly service: SpecieService) {}

  async execute(specieId: number): Promise<Specie> {
    return await this.service.getSpecieById(specieId)
  }
}
