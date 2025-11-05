import type { AppointmentService } from "../domain/services/AppointmentService";

export class GetAllAppointments{
  constructor(private readonly appointmentService:AppointmentService){}
  async execute(){
   return await this.appointmentService.getAllAppointments()
  }
}
