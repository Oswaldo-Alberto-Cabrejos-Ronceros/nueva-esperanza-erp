import type { AnimalInfoForAppointment } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetAnimalInfoForAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(appointmentId: number): Promise<AnimalInfoForAppointment> {
    return await this.appointmentService.getAnimalInfo(appointmentId)
  }
}
