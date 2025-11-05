import { clientUsesCases } from '@/dependency-injection/client.container'
import { useAsyncHandler } from './useAsyncHandler'
import type {
  Client,
  ClientUpdateAsClient,
  MyInfoClient,
} from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'
import { ClientAdapter } from '@/adapters/ClientAdapter'
import type { FormValues as ClientAddSchema } from '@/validation-schemas-forms/schema-add-client'
import type { FormValues as ClientEditSchema } from '@/validation-schemas-forms/schema-edit-client'
import type { PageResponse } from '@/services/models/PageResponse'
import type { MyInfoClient as MyInfoClientView } from '@/models/MyInfoClient'
import type { FormValues as SchemaEditSelfClient } from '@/validation-schemas-forms/schema-edit-self-client'
import type { ClientBasicInfoByDni as ClientBasicInfoByDniView } from '@/models/ClientBasicInfoByDni'
import type { ClientList as ClientListView } from '@/models/ClientList'
import type { ClientInfoPanel } from '@/models/ClientInfoPanel'

export function useClient() {
  //from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases
  const blockClient = async (clientId: number, note: string) => {
    await runUseCase('blockClient', () => clientUsesCases.blockClient.execute(clientId, note))
  }

  //fix
  const createClient = async (clientAddSchema: ClientAddSchema): Promise<ClientView> => {
    const clientRequest = ClientAdapter.fromSchemaAddToClientRequest(clientAddSchema)
    const clientCreate: Client = await runUseCase('createClient', () =>
      clientUsesCases.createClient.execute(clientRequest),
    )
    //adapt
    return ClientAdapter.toClientView(clientCreate)
  }

  const deleteClient = async (clientId: number) => {
    await runUseCase('deleteClient', () => clientUsesCases.deleteClient.execute(clientId))
  }

  const getAllClients = async (): Promise<ClientView[]> => {
    const clients: Client[] = await runUseCase('getAllClients', () =>
      clientUsesCases.getAllClients.execute(),
    )
    return clients.map((client) => ClientAdapter.toClientView(client))
  }

  const getClientById = async (clientId: number): Promise<ClientView> => {
    const client: Client = await runUseCase('getClientById', () =>
      clientUsesCases.getClientById.execute(clientId),
    )
    return ClientAdapter.toClientView(client)
  }

  const myInfoAsClient = async (clientId: number): Promise<MyInfoClientView> => {
    console.log(clientId)
    const myInfoClient: MyInfoClient = await runUseCase('myInfoAsClient', () =>
      clientUsesCases.myInfoAsClient.execute(clientId),
    )
    return ClientAdapter.fromMyInfoClientToMyInfoClientView(myInfoClient)
  }

  const searchClient = async (
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<ClientListView>> => {
    const pageClient = await runUseCase('searchClient', () =>
      clientUsesCases.searchClient.execute(dni, name, lastName, status, headquarterId, page, size),
    )
    const clientsView = pageClient.content.map((client) =>
      ClientAdapter.fromClientListToClientListView(client),
    )
    return {
      ...pageClient,
      content: clientsView,
    }
  }

  const updateBlockNote = async (clientId: number, blockNote: string): Promise<string> => {
    return await runUseCase('updateBlockNote', () =>
      clientUsesCases.updateBlockNote.execute(clientId, blockNote),
    )
  }

  const updateClient = async (
    clientId: number,
    clientEditSchema: ClientEditSchema,
  ): Promise<ClientView> => {
    const clientRequest = ClientAdapter.fromSchemaEditToClientRequest(clientEditSchema)
    const clientUpdated = await runUseCase('updateClient', () =>
      clientUsesCases.updateClient.execute(clientId, clientRequest),
    )
    return ClientAdapter.toClientView(clientUpdated)
  }

  //fix
  const updateClientAsClient = async (
    clientId: number,
    schemaEditSelfClient: SchemaEditSelfClient,
  ): Promise<string> => {
    const clientUpdateAsClient: ClientUpdateAsClient =
      ClientAdapter.fromSchemaEditSelfClientToClientUpdateAsClient(schemaEditSelfClient)
    return await runUseCase('updateClientAsClient', () =>
      clientUsesCases.updateClientAsClient.execute(clientId, clientUpdateAsClient),
    )
  }

  const getClientByDni = async (clientDni: string): Promise<ClientBasicInfoByDniView> => {
    const clientBasicInfoByDni = await runUseCase('getClientByDni', () =>
      clientUsesCases.getClientByDni.execute(clientDni),
    )
    return ClientAdapter.fromClientBasicInfoByDniToClientBasicInfoByDniView(clientBasicInfoByDni)
  }

const getClientInfoPanelAdmin = async ():Promise<ClientInfoPanel[]> => {
  const clients =  await runUseCase('getClientInfoPanelAdmin', () =>
    clientUsesCases.getClientInfoPanelAdmin.execute()
  )
  return clients.map((client)=>ClientAdapter.fromClientInfoPanelAdminToView(client))
}

const getClientStatsPanel = async () => {
  return await runUseCase('getClientStatsPanel', () =>
    clientUsesCases.getClientStatsPanel.execute()
  )
}

const getClientInfoPanelByHeadquarter = async (headquarterId: number):Promise<ClientInfoPanel[]> => {
   const clients =  await runUseCase('getClientInfoPanelByHeadquarter', () =>
    clientUsesCases.getClientInfoPanelByHeadquarter.execute(headquarterId)

  )
   return clients.map((client)=>ClientAdapter.fromClientInfoPanelAdminToView(client))
}

const getClientStatsByHeadquarter = async (headquarterId: number) => {
  return await runUseCase('getClientStatsByHeadquarter', () =>
    clientUsesCases.getClientStatsByHeadquarter.execute(headquarterId)
  )
}

const getClientStatsToday = async () => {
  return await runUseCase('getClientStatsToday', () =>
    clientUsesCases.getClientStatsToday.execute(),
  )
} //for recepcionist
  return {
    loading,
    error,
    blockClient,
    createClient,
    deleteClient,
    getAllClients,
    getClientById,
    myInfoAsClient,
    searchClient,
    updateBlockNote,
    updateClient,
    updateClientAsClient,
    getClientByDni,
    getClientInfoPanelAdmin,
    getClientStatsPanel,
    getClientInfoPanelByHeadquarter,
    getClientStatsByHeadquarter,
    getClientStatsToday
  }
}
