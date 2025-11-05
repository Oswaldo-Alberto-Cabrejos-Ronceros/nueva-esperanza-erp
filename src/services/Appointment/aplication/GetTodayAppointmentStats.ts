import type { AppointmentStatsToday } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetTodayAppointmentStats {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(): Promise<AppointmentStatsToday> {
    return await this.appointmentService.getTodayAppointmentStats()
  }
}
