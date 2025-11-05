import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class ListVeterinariansByHeadVetService {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}
  async execute(headquarterVetServiceId: number) {
    return this.headquarterVetService.listVeterinariansByHeadVetService(headquarterVetServiceId)
  }
}
