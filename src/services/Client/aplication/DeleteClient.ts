import type { ClientService } from '../domain/services/ClientService'

export class DeleteClient {
  constructor(private readonly clientService: ClientService) {}

  async execute(clientId: number) {
    await this.clientService.deleteClient(clientId)
  }
}
