import type { CareService } from '../domain/services/CareService'

export class GetCareById {
  constructor(private readonly careService: CareService) {}
  async execute(id: number) {
    return this.careService.getCareById(id)
  }
}
