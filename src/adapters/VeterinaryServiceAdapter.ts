import type {
  VeterinaryService,
  VeterinaryServiceRequest,
} from '@/services/VeterinaryService/domain/models/VeterinaryService'
import type { FormValues as VeterinaryServiceAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-service'
import type { Service as VeterinaryServiceView } from '@/models/Service'

import type { VeterinaryServiceList } from '@/services/VeterinaryService/domain/models/VeterinaryService'
import type { ServiceList as VeterinaryServiceListView } from '@/models/ServiceList'

import type { ServicesInfoTopPanelAdmin as ServicesInfoTopPanelAdminView } from '@/models/ServicesInfoTopPanelAdmin'
import type { ServicesInfoTopPanelAdmin } from '@/services/VeterinaryService/domain/models/VeterinaryService'

export class VeterinaryServiceAdapter {
  static toView(service: VeterinaryService): VeterinaryServiceView {
    return {
      id: service.serviceId!,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      dirImage: '',
      specie: service.specie.name,
      specieId: service.specie.specieId,
      category: service.category.name,
      categoryId: service.category.categoryId,
      status: service.status,
    }
  }

  static fromSchemaAddEditToRequest(
    schema: VeterinaryServiceAddEditSchema,
  ): VeterinaryServiceRequest {
    return {
      name: schema.name,
      description: schema.description,
      price: schema.price,
      duration: schema.duration,
      specie: {
        specieId: schema.specieId,
      },
      category: {
        categoryId: schema.categoryId,
      },
    }
  }

  static fromVeterinaryServiceListToVeterinaryServiceListView(
    service: VeterinaryServiceList,
  ): VeterinaryServiceListView {
    return {
      serviceId: service.serviceId,
      name: service.name,
      specie: service.specie,
      category: service.category,
      price: service.price,
      duration: service.duration,
      status: service.status,
    }
  }

  static toServiceInfoTopPanelAdmin(
    service: ServicesInfoTopPanelAdmin,
  ): ServicesInfoTopPanelAdminView {
    return {
      id: service.serviceId,
      name: service.serviceName,
      categoryName: service.categoryName,
      imageServiceUrl: service.imageServiceUrl,
      totalCares: service.totalCares,
    }
  }
}
