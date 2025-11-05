import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class DeleteHeadquarterVetService {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}

  async execute(id: number) {
    return this.headquarterVetService.delete(id)
  }
}
