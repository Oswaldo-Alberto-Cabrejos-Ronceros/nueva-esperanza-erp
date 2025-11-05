import type { ClientService } from '../domain/services/ClientService'

export class UpdateBlockNote {
  constructor(private readonly clientService: ClientService) {}
  async execute(clientId: number, blockNote: string): Promise<string> {
    return await this.clientService.updateBlockNote(clientId, blockNote)
  }
}
