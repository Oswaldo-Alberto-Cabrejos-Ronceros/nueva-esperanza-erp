//import uses cases
import { BlockClient } from '@/services/Client/aplication/BlockClient'
import { CreateClient } from '@/services/Client/aplication/CreateClient'
import { DeleteClient } from '@/services/Client/aplication/DeleteClient'
import { GetAllClients } from '@/services/Client/aplication/GetAllClients'
import { GetClientById } from '@/services/Client/aplication/GetClientById'
import { MyInfoAsClient } from '@/services/Client/aplication/MyInfoAsClient'
import { SearchClient } from '@/services/Client/aplication/SearchClient'
import { UpdateBlockNote } from '@/services/Client/aplication/UpdateBlockNote'
import { UpdateClient } from '@/services/Client/aplication/UpdateClient'
import { UpdateClientAsClient } from '@/services/Client/aplication/UpdateClientAsClient'
import { GetClientByDni } from '@/services/Client/aplication/GetClientByDni'
//import axiosHttpClient
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
//import service implementation
import { ClientServiceImpl } from '@/services/Client/infrastructure/ClientServiceImpl'
import { GetClientInfoPanelAdmin } from '@/services/Client/aplication/GetClientInfoPanelAdmin'
import { GetClientStatsPanel } from '@/services/Client/aplication/GetClientStatsPanel'
import { GetClientInfoPanelByHeadquarter } from '@/services/Client/aplication/GetClientInfoPanelByHeadquarter'
import { GetClientStatsByHeadquarter } from '@/services/Client/aplication/GetClientStatsByHeadquarter'
import { GetClientStatsToday } from '@/services/Client/aplication/GetClientStatsToday'


//instantiete AxiosHttpClient
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const clientService = new ClientServiceImpl(axiosHttpClient)

//exporse uses cases

export const clientUsesCases = {
  //inject dependency
  blockClient: new BlockClient(clientService),
  createClient: new CreateClient(clientService),
  deleteClient: new DeleteClient(clientService),
  getAllClients: new GetAllClients(clientService),
  getClientById: new GetClientById(clientService),
  myInfoAsClient: new MyInfoAsClient(clientService),
  searchClient: new SearchClient(clientService),
  updateBlockNote: new UpdateBlockNote(clientService),
  updateClient: new UpdateClient(clientService),
  updateClientAsClient: new UpdateClientAsClient(clientService),
  getClientByDni: new GetClientByDni(clientService),
    getClientInfoPanelAdmin: new GetClientInfoPanelAdmin(clientService),
  getClientStatsPanel: new GetClientStatsPanel(clientService),
  getClientInfoPanelByHeadquarter: new GetClientInfoPanelByHeadquarter(clientService),
  getClientStatsByHeadquarter: new GetClientStatsByHeadquarter(clientService),
  getClientStatsToday: new GetClientStatsToday(clientService),//for recepcionist
}
