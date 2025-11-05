import type { CareAndAppointmentPanelEmployee } from '@/services/Appointment/domain/models/Appointment'
import type { CareService } from '@/services/Care/domain/services/CareService'

export class GetCaresByHeadquarterId {
  constructor(private readonly careService: CareService) {}

  async execute(headquarterId: number): Promise<CareAndAppointmentPanelEmployee[]> {
    return await this.careService.getCaresByHeadquarterId(headquarterId)
  }
}
