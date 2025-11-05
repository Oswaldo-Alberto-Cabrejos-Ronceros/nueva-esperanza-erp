import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class ActivateVeterinaryService {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(serviceId: number): Promise<void> {
    await this.service.activateVeterinaryService(serviceId)
  }
}
