import type { CareService } from '../domain/services/CareService'

export class GetCareByAppointment {
  constructor(private readonly careService: CareService) {}
  async execute(id: number) {
    return this.careService.getCareByAppointment(id)
  }
}
