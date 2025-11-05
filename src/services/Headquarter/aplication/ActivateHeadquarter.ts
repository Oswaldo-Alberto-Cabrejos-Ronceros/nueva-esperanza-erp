import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class ActivateHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(headquarterId: number): Promise<void> {
    return this.headquarterService.activateHeadquarter(headquarterId)
  }
}
