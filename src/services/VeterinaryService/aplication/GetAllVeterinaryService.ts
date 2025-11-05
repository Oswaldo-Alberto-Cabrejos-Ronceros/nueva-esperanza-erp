import type { VeterinaryService } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetAllVeterinaryServices {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(): Promise<VeterinaryService[]> {
    return await this.service.getAllVeterinaryServices()
  }
}
