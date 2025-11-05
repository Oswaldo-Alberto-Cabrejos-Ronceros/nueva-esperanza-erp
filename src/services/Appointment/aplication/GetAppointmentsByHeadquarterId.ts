import type { AppointmentService } from '../domain/services/AppointmentService'
import type { CareAndAppointmentPanelEmployee } from '../domain/models/Appointment'

export class GetAppointmentsByHeadquarterIdUseCase {
  constructor(private readonly service: AppointmentService) {}

  async execute(headquarterId: number): Promise<CareAndAppointmentPanelEmployee[]> {
    return await this.service.getAppointmentsByHeadquarterId(headquarterId)
  }
}
