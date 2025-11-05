import type { ServicesInfoTopPanelAdmin } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetTopServicesForManager {
  constructor(private readonly veterinaryServiceService: VeterinaryServiceService) {}

  async execute(headquarterId: number): Promise<ServicesInfoTopPanelAdmin[]> {
    return await this.veterinaryServiceService.getTopServicesForManager(headquarterId)
  }
}
