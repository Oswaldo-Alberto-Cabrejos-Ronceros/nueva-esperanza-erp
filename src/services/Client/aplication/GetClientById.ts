import type { Client } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class GetClientById {
  constructor(private readonly clientService: ClientService) {}
  async execute(clientId: number): Promise<Client> {
    return await this.clientService.getClientById(clientId)
  }
}
