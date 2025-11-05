import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class GetHeadquarterVetServiceById {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}
  async execute(id: number) {
    return this.headquarterVetService.getById(id)
  }
}
