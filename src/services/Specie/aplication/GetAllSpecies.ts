import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie } from '../domain/models/Specie'

export class GetAllSpecies {
  constructor(private readonly service: SpecieService) {}

  async execute(): Promise<Specie[]> {
    return await this.service.getAllSpecies()
  }
}
