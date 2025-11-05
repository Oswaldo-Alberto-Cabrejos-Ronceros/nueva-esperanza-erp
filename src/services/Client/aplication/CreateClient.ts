import type { Client,ClientRequest } from "../domain/models/Client";
import type { ClientService } from "../domain/services/ClientService";

export class CreateClient{
  constructor(private readonly clientService:ClientService){}

  async execute(clientRequest:ClientRequest):Promise<Client> {
    return await this.clientService.createClient(clientRequest)
  }
}
