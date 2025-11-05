import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { VeterinarianPerformance } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetTopVeterinariansPerformanceByHeadquarter {
  constructor(private readonly appointmentService: AppointmentService) {}

  execute(period: ReportPeriod, headquarterId: number): Promise<VeterinarianPerformance> {
    return this.appointmentService.getTopVeterinariansPerformanceByHeadquarter(period, headquarterId)
  }
}
