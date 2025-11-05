import type { ClientInfoPanelAdmin } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class GetClientInfoPanelByHeadquarter {
  constructor(private readonly clientService: ClientService) {}

  async execute(headquarterId: number): Promise<ClientInfoPanelAdmin[]> {
    return await this.clientService.getClientInfoPanelByHeadquarterManager(headquarterId)
  }
}
