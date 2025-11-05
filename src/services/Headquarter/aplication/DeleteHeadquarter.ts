import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class DeleteHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(headquarterId: number) {
    return await this.headquarterService.deleteHeadquarter(headquarterId)
  }
}
