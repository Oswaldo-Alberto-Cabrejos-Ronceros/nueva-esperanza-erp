import type { VeterinaryService } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetVeterinaryServicesByCategory {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(categoryId: number): Promise<VeterinaryService[]> {
    return await this.service.getAllServicesByCategory(categoryId)
  }
}
