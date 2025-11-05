import type { Headquarter, HeadquarterRequest } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class CreateHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}
  async execute(headquarterRequest: HeadquarterRequest): Promise<Headquarter> {
    return await this.headquarterService.createHeadquarter(headquarterRequest)
  }
}
