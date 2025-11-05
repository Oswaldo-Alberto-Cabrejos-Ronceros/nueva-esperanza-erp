import type { PageResponse } from '@/services/models/PageResponse'
import type { ClientList } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class SearchClient {
  constructor(private readonly clientService: ClientService) {}
  async execute(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<ClientList>> {
    return await this.clientService.searchClients(
      dni,
      name,
      lastName,
      status,
      headquarterId,
      page,
      size,
    )
  }
}
