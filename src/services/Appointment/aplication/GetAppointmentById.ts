import type { AppointmentService } from "../domain/services/AppointmentService";

export class GetAppointmentById{
   constructor(private readonly appointmentService:AppointmentService){}
   async execute(appointmentId:number){
   return await this.appointmentService.getAppointmentById(appointmentId)
   }
}
