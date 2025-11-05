import type { Headquarter } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class GetHeadquarterById {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(headquarterId: number): Promise<Headquarter> {
    return await this.headquarterService.getHeadquarterById(headquarterId)
  }
}
