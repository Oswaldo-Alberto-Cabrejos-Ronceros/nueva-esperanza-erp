import type { VeterinaryService } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetVeterinaryServicesBySpecie {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(specieId: number): Promise<VeterinaryService[]> {
    return await this.service.getAllServicesBySpecie(specieId)
  }
}
