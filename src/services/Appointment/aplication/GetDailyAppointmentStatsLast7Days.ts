import type { DailyAppointmentStats } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetDailyAppointmentStatsLast7Days {
  constructor(private readonly appointmentService: AppointmentService) {}

  execute(): Promise<DailyAppointmentStats> {
    return this.appointmentService.getDailyAppointmentStatsLast7Days()
  }
}
