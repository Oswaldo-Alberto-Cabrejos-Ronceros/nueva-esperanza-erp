import type { CareRequest } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'

export class CreateCare {
  constructor(private readonly careService: CareService) {}
  async execute(careRequest: CareRequest) {
    return this.careService.createCare(careRequest)
  }
}
