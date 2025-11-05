import type { OperationalMonthlyStats } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetGeneralOperationalMonthlyStats {
  constructor(private readonly appointmentService: AppointmentService) {}

  execute(): Promise<OperationalMonthlyStats> {
    return this.appointmentService.getGeneralOperationalMonthlyStats()
  }
}
