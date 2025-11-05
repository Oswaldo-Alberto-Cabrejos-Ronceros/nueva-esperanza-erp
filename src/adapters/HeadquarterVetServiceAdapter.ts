import type {
  HeadquarterServiceInfoPanel,
  HeadquarterVetService,
} from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
import type { HeadquarterVetService as HeadquarterVetServiceView } from '@/models/HeadquarterVetService'
import { VeterinaryServiceAdapter } from './VeterinaryServiceAdapter'
import type { FormValues as AddHeadquarterVetServiceSchema } from '@/validation-schemas-forms/schema-add-headquarter-vet-service'
import type { HeadquarterVetServiceRequest } from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
import type { HeadquarterServiceInfoPanel as HeadquarterServiceInfoPanelView } from '@/models/HeadquarterServiceInfoPanel'

export class HeadquarterVetServiceAdapter {
  static toHeadquarterVetServiceView(
    headquarterVetService: HeadquarterVetService,
  ): HeadquarterVetServiceView {
    return {
      id: headquarterVetService.id,
      headquarterId: headquarterVetService.headquarterId,
      service: VeterinaryServiceAdapter.toView(headquarterVetService.service),
      simultaneousCapacity: headquarterVetService.simultaneousCapacity,
      status: headquarterVetService.status,
    }
  }
  static fromSchemaToRequest(schema: AddHeadquarterVetServiceSchema): HeadquarterVetServiceRequest {
    return {
      headquarterId: schema.headquarterId,
      service: {
        serviceId: schema.serviceId,
      },

      simultaneousCapacity: schema.simultaneousCapacity,
    }
  }

  static fromPanelInfoToPanelInfoView(
    domain: HeadquarterServiceInfoPanel,
  ): HeadquarterServiceInfoPanelView {
    return {
      headquarterId: domain.headquarterId,
      headquarterName: domain.headquarterName,
      serviceId: domain.serviceId,
      serviceName: domain.serviceName,
      serviceDescription: domain.serviceDescription,
      servicePrice: domain.servicePrice,
      serviceDuration: domain.serviceDuration,
      categoryName: domain.categoryName,
      specieName: domain.speciesName,
      serviceImageUrl:domain.serviceImageUrl
    }
  }
}
