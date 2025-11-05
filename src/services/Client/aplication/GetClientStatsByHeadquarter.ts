import type { ClientStatsPanel } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class GetClientStatsByHeadquarter {
  constructor(private readonly clientService: ClientService) {}

  async execute(headquarterId: number): Promise<ClientStatsPanel> {
    return await this.clientService.getClientStatsByHeadquarter(headquarterId)
  }
}
