import type { OperationalMonthlyStats } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetOperationalMonthlyStatsByHeadquarter {
  constructor(private readonly appointmentService: AppointmentService) {}

  execute(headquarterId: number): Promise<OperationalMonthlyStats> {
    return this.appointmentService.getOperationalMonthlyStatsByHeadquarter(headquarterId)
  }
}
