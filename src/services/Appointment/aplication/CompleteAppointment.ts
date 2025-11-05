import type { AppointmentService } from "../domain/services/AppointmentService";

export class CompleteAppointment{
    constructor(private readonly appointmentService: AppointmentService) {}
    async execute(appointmentId: number) {
      return await this.appointmentService.completeAppointment(appointmentId)
    }
}
