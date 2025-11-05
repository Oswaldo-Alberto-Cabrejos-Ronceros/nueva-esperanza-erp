import type { Headquarter } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class GetAllHeadquarters {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(): Promise<Headquarter[]> {
    return await this.headquarterService.getAllHeadquarters()
  }
}
