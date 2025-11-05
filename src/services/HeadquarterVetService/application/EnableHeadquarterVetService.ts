import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class EnableHeadquarterVetService {
  constructor(private readonly service: HeadquarterVetServiceService) {}
  async execute(id: number): Promise<void> {
    await this.service.enableHeadquarterVetService(id)
  }
}
