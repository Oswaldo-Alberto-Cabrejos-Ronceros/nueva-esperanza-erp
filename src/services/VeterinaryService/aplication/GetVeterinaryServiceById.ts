import type { VeterinaryService } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetVeterinaryServiceById {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(id: number): Promise<VeterinaryService> {
    return await this.service.getVeterinaryServiceById(id)
  }
}
