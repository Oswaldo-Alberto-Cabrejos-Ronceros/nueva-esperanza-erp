import type { Client, ClientInfoPanelAdmin, ClientRequest, MyInfoClient } from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'
import type { FormValues as ClientAddSchema } from '@/validation-schemas-forms/schema-add-client'
import type { FormValues as ClientEditSchema } from '@/validation-schemas-forms/schema-edit-client'
import type { MyInfoClient as MyInfoClientView } from '@/models/MyInfoClient'
import type { FormValues as SchemaEditSelfClient } from '@/validation-schemas-forms/schema-edit-self-client'
import type { ClientUpdateAsClient } from '@/services/Client/domain/models/Client'
import type { ClientBasicInfoByDni } from '@/services/Client/domain/models/Client'
import type { ClientBasicInfoByDni as ClientBasicInfoByDniView } from '@/models/ClientBasicInfoByDni'
import type { ClientList as ClientListView } from '@/models/ClientList'
import type { ClientList } from '@/services/Client/domain/models/Client'

import { DateAdapter } from './DateAdapter'
import type { ClientInfoPanel } from '@/models/ClientInfoPanel'

export class ClientAdapter {
  static toClientView(client: Client): ClientView {
    return {
      clientId: client.clientId,
      dni: client.dni,
      names: client.name,
      lastnames: client.lastName,
      phone: client.phone,
      address: client.address,
      birthdate: client.birthDate,
      headquarter: {
        headquarterId: client.headquarter.headquarterId,
        name: client.headquarter.name,
      },
      user: {
        userId: client.user?.userId,
        email: client.user?.email,
      },
    }
  }

  //para adaptar de schema add a ClientRequest
  static fromSchemaAddToClientRequest(schemaAdd: ClientAddSchema): ClientRequest {
    return {
      dni: schemaAdd.dni,
      name: schemaAdd.names,
      lastName: schemaAdd.lastnames,
      address: schemaAdd.address,
      phone: schemaAdd.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaAdd.birthdate),
      headquarter: {
        headquarterId: schemaAdd.headquarterId,
      },
      user: {
        email: schemaAdd.email,
        password: schemaAdd.password,
      },
    }
  }

  //para adaptar de schema edit a ClientRequest
  static fromSchemaEditToClientRequest(schemaEdit: ClientEditSchema): ClientRequest {
    return {
      dni: schemaEdit.dni,
      name: schemaEdit.names,
      lastName: schemaEdit.lastnames,
      address: schemaEdit.address,
      phone: schemaEdit.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaEdit.birthdate),
      headquarter: {
        headquarterId: schemaEdit.headquarterId,
      },
    }
  }
  //para mapear de MyInfoAsClient  MyInfoAsClientView
  static fromMyInfoClientToMyInfoClientView(myInfoAsClient: MyInfoClient): MyInfoClientView {
    return {
      clientId: myInfoAsClient.clientId,
      user: {
        id: myInfoAsClient.user.id,
        email: myInfoAsClient.user.email,
      },
      dni: myInfoAsClient.dni,
      names: myInfoAsClient.names,
      lastnames: myInfoAsClient.lastNames,
      phone: myInfoAsClient.phone,
      address: myInfoAsClient.address,
      headquarter: {
        id: myInfoAsClient.headquarter.id,
        name: myInfoAsClient.headquarter.name,
      },
    }
  }

  static fromSchemaEditSelfClientToClientUpdateAsClient(
    schemaEditSelfClient: SchemaEditSelfClient,
  ): ClientUpdateAsClient {
    return {
      address: schemaEditSelfClient.address,
      phone: schemaEditSelfClient.phone,
      headquarterId: schemaEditSelfClient.headquarterId,
    }
  }

  static fromClientBasicInfoByDniToClientBasicInfoByDniView(
    clientBasicInfoByDni: ClientBasicInfoByDni,
  ): ClientBasicInfoByDniView {
    return {
      id: clientBasicInfoByDni.id,
      fullName: clientBasicInfoByDni.fullName,
    }
  }

  //for adapt clientList
  static fromClientListToClientListView(clientList: ClientList): ClientListView {
    return {
      id: clientList.clientId,
      dni: clientList.dni,
      names: clientList.name,
      lastnames: clientList.lastName,
      headquarterName: clientList.headquarterName,
      status: clientList.status,
    }
  }
  static fromClientInfoPanelAdminToView(client: ClientInfoPanelAdmin): ClientInfoPanel {
  return {
    id: client.clientId,
    fullName: client.fullName,
    initials: client.initials,
    phone: client.phone,
  }
}
}
