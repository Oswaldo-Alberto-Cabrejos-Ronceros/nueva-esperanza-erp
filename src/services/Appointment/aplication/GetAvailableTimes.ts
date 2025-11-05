import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetAvailableTimes {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(headquarterVetServiceId: number, date: string) {
    return await this.appointmentService.getAvailableTimes(headquarterVetServiceId, date)
  }
}
