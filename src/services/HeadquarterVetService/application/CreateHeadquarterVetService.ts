import type { HeadquarterVetServiceRequest } from '../domain/models/HeadquarterVetService'
import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class CreateHeadquarterVetService {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}
  async execute(request: HeadquarterVetServiceRequest) {
    return this.headquarterVetService.create(request)
  }
}
