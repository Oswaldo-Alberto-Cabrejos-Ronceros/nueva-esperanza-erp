import type { ClientService } from '../domain/services/ClientService'

export class BlockClient {
  constructor(private readonly clientService: ClientService) {}
  async execute(clientId: number, note: string) {
    await this.clientService.blockClient(clientId, note)
  }
}
