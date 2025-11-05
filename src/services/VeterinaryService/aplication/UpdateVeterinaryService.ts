import type { VeterinaryService, VeterinaryServiceRequest } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class UpdateVeterinaryService {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(id: number, data: VeterinaryServiceRequest): Promise<VeterinaryService> {
    return await this.service.updateVeterinaryService(id, data)
  }
}
