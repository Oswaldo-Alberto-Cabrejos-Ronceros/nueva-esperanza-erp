import type { ClientInfoPanelAdmin } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class GetClientInfoPanelAdmin {
  constructor(private readonly clientService: ClientService) {}

  async execute(): Promise<ClientInfoPanelAdmin[]> {
    return await this.clientService.getClientInfoPanelAdmin()
  }
}
