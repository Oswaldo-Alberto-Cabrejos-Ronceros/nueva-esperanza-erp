import type { Headquarter, HeadquarterRequest } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class UpdateHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(headquarterId: number, headquarterRequest: HeadquarterRequest): Promise<Headquarter> {
    return await this.headquarterService.updateHeadquarter(headquarterId, headquarterRequest)
  }
}
