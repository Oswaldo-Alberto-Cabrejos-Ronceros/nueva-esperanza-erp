import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { AppointmentService } from '../domain/services/AppointmentService'
import type { VeterinarianPerformance } from '../domain/models/Appointment'

export class GetTopVeterinariansPerformance {
  constructor(private readonly appointmentService: AppointmentService) {}

  execute(period: ReportPeriod): Promise<VeterinarianPerformance> {
    return this.appointmentService.getTopVeterinariansPerformance(period)
  }
}
