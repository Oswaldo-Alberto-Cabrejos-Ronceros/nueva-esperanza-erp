import type { DailyAppointmentStats } from "../domain/models/Appointment";
import type { AppointmentService } from "../domain/services/AppointmentService";

export class GetDailyAppointmentStatsByHeadquarter {
  constructor(private readonly appointmentService: AppointmentService) {}


  execute(headquarterId: number): Promise<DailyAppointmentStats> {
    return this.appointmentService.getDailyAppointmentStatsByHeadquarter(headquarterId)
  }
}
