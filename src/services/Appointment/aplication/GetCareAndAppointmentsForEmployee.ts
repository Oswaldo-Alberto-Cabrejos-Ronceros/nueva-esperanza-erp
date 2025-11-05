import type { CareAndAppointmentPanelEmployee } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetCareAndAppointmentsForEmployee {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(employeeId: number): Promise<CareAndAppointmentPanelEmployee[]> {
    return await this.appointmentService.getCareAndAppointmentsForEmployee(employeeId)
  }
}
