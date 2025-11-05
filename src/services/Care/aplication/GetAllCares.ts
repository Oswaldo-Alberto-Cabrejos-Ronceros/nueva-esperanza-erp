import type { CareService } from '../domain/services/CareService'

export class GetAllCares {
  constructor(private readonly careService: CareService) {}
  async execute() {
    return this.careService.getAllCares()
  }
}
