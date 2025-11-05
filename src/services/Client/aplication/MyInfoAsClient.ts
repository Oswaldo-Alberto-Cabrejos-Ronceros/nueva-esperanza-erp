import type { MyInfoClient } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class MyInfoAsClient {
  constructor(private readonly clientService: ClientService) {}

  async execute(clientId: number): Promise<MyInfoClient> {
    return await this.clientService.myInfoAsClient(clientId)
  }
}
