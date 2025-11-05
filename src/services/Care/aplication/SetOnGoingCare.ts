
import type { CareService } from '../domain/services/CareService'
import type { Care } from '../domain/models/Care'

export class SetOnGoingCare {
  constructor(private readonly careService: CareService) {}

  async execute(id: number): Promise<Care> {
    return await this.careService.onGoingCare(id)
  }
}
