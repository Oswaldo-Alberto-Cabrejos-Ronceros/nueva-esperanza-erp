import type { AppointmentService } from '../domain/services/AppointmentService'
import type { AppointmentStatsToday } from '../domain/models/Appointment'

export class GetTodayAppointmentStatsByHeadquarter {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(headquarterId: number): Promise<AppointmentStatsToday> {
    return await this.appointmentService.getTodayAppointmentStatsByHeadquarter(headquarterId)
  }
}
