import type { VeterinaryService, VeterinaryServiceRequest } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class CreateVeterinaryService {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(data: VeterinaryServiceRequest): Promise<VeterinaryService> {
    return await this.service.createVeterinaryService(data)
  }
}
