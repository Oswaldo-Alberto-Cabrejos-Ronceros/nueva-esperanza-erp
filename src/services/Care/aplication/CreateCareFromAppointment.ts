import type { CareService } from "../domain/services/CareService";
import type { CreateCareFromAppointmentRequest } from "../domain/models/Care";

export class CreateCareFromAppointment{
  constructor(private readonly careService:CareService){}
  async execute(createCareFromAppointment: CreateCareFromAppointmentRequest){
    return this.careService.createCareFromAppointment(createCareFromAppointment)
  }
}
