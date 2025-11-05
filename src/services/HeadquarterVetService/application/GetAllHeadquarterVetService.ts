import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class GetAllHeadquarterVetService {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}

  async execute() {
    return this.headquarterVetService.getAll()
  }
}
