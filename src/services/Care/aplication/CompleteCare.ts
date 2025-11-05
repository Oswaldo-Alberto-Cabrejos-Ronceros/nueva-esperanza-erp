import type { CareService } from '../domain/services/CareService'

export class CompleteCare {
  constructor(private readonly careService: CareService) {}
  async execute(id: number) {
    return this.careService.completeCare(id)
  }
}
