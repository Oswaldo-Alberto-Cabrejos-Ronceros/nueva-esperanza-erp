import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class UpdateSimultaneousCapacity {
  constructor(private readonly service: HeadquarterVetServiceService) {}
  async execute(id: number, capacity: number): Promise<void> {
    await this.service.updateSimultaneousCapacity(id, capacity)
  }
}
