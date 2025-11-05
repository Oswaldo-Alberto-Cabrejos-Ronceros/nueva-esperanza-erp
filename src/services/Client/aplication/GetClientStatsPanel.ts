import type { ClientStatsPanel } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class GetClientStatsPanel {
  constructor(private readonly clientService: ClientService) {}

  async execute(): Promise<ClientStatsPanel> {
    return await this.clientService.getClientStats()
  }
}
