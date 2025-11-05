import type { ClientUpdateAsClient } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class UpdateClientAsClient {
  constructor(private readonly clientService: ClientService) {}
  async execute(clientId: number, clientUpdateAsClient: ClientUpdateAsClient): Promise<string> {
    return await this.clientService.updateClientAsClient(clientId, clientUpdateAsClient)
  }
}
