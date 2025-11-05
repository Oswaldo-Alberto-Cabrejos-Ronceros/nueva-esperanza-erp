import type { CareAndAppointmentPanelEmployee } from '@/services/Appointment/domain/models/Appointment'
import type { CareService } from '@/services/Care/domain/services/CareService'

export class GetCaresForEmployee{
  constructor(private readonly careService: CareService) {}

  async execute(employeeId: number): Promise<CareAndAppointmentPanelEmployee[]> {
    return await this.careService.getCaresForEmployee(employeeId)
  }
}
