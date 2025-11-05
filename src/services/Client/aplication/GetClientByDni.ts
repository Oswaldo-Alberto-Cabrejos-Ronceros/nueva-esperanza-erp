import type { ClientService } from '../domain/services/ClientService'

export class GetClientByDni {
  constructor(private readonly clientService: ClientService) {}

  async execute(clientId: string) {
    return this.clientService.getClientByDni(clientId)
  }
}
