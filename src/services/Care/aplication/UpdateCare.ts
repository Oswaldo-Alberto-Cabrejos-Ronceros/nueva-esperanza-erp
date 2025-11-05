import type { CareRequest } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'

export class UpdateCare {
  constructor(private readonly careService: CareService) {}
  async execute(id: number, careRequest: CareRequest) {
    return this.careService.updateCare(id, careRequest)
  }
}
