import type { PageResponse } from '@/services/models/PageResponse'
import type {
  Client,
  ClientBasicInfoByDni,
  ClientInfoPanelAdmin,
  ClientList,
  ClientRequest,
  ClientStatsPanel,
  ClientStatsToday,
  ClientUpdateAsClient,
  MyInfoClient,
} from '../models/Client'

export interface ClientService {
  getClientById(clientId: number): Promise<Client>
  searchClients(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<ClientList>>
  createClient(clientRequest: ClientRequest): Promise<Client>
  getAllClients(): Promise<Client[]>
  updateClient(clientId: number, clientRequest: ClientRequest): Promise<Client>
  blockClient(clientId: number, note: string): Promise<void>
  deleteClient(clientId: number): Promise<void>
  myInfoAsClient(clientId: number): Promise<MyInfoClient>
  updateClientAsClient(
    clientId: number,
    clientUpdateAsClient: ClientUpdateAsClient,
  ): Promise<string>
  updateBlockNote(clientId: number, blockNote: string): Promise<string>
  getClientByDni(dni: string): Promise<ClientBasicInfoByDni>

  getClientInfoPanelAdmin(): Promise<ClientInfoPanelAdmin[]>
  getClientStats(): Promise<ClientStatsPanel>
  getClientInfoPanelByHeadquarterManager(headquarterId: number): Promise<ClientInfoPanelAdmin[]>
  getClientStatsByHeadquarter(headquarterId: number): Promise<ClientStatsPanel>
  getClientStatsToday(): Promise<ClientStatsToday>
}
