
import type { ServicesInfoTopPanelAdmin } from '../domain/models/VeterinaryService'
import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class GetTopServicesForAdmin {
  constructor(private readonly veterinaryServiceService: VeterinaryServiceService) {}

  async execute(): Promise<ServicesInfoTopPanelAdmin[]> {
    return await this.veterinaryServiceService.getTopServicesForAdmin()
  }
}
