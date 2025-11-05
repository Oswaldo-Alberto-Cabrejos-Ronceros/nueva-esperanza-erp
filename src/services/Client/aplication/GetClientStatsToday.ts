import type { ClientStatsToday } from "../domain/models/Client";
import type { ClientService } from "../domain/services/ClientService";

export class GetClientStatsToday{
  constructor(private readonly service: ClientService) {}

  execute(): Promise<ClientStatsToday> {
    return this.service.getClientStatsToday()
  }
}
