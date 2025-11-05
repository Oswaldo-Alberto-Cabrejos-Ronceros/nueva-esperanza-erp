import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetServicesByHeadquarterAndSpecies {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(headquarterId: number, speciesId: number) {
    return this.appointmentService.getServicesByHeadquarterAndSpecies(headquarterId, speciesId)
  }
}
