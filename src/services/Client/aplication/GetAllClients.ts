import type { ClientService } from '../domain/services/ClientService'

export class GetAllClients {
  constructor(private readonly clientService: ClientService) {}

  async execute() {
    return await this.clientService.getAllClients()
  }
}
