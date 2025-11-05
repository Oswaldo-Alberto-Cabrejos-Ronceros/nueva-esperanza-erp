import type { ReniecService } from '../domain/services/ReniecService'

export class GetInfoSimpleByReniec {
  constructor(private readonly reniecService: ReniecService) {}

  async execute(dni: string) {
    return this.reniecService.getInfoSimpleByReniec(dni)
  }
}
