import { veterinaryServiceUsesCases } from '@/dependency-injection/veterinary-service.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { VeterinaryService } from '@/services/VeterinaryService/domain/models/VeterinaryService'
import { VeterinaryServiceAdapter } from '@/adapters/VeterinaryServiceAdapter'
import type { Service as VeterinaryServiceView } from '@/models/Service'
import type { FormValues as VeterinaryServiceAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-service'
import type { PageResponse } from '@/services/models/PageResponse'

import type { ServiceList as VeterinaryServiceListView } from '@/models/ServiceList'

import type { ServicesInfoTopPanelAdmin as ServicesInfoTopPanelAdminView } from '@/models/ServicesInfoTopPanelAdmin'


export function useVeterinaryService() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const createVeterinaryService = async (
    schema: VeterinaryServiceAddEditSchema,
  ): Promise<VeterinaryServiceView> => {
    const request = VeterinaryServiceAdapter.fromSchemaAddEditToRequest(schema)
    const service = await runUseCase('createVeterinaryService', () =>
      veterinaryServiceUsesCases.createVeterinaryService.execute(request),
    )
    return VeterinaryServiceAdapter.toView(service)
  }

  const deleteVeterinaryService = async (id: number) => {
    await runUseCase('deleteVeterinaryService', () =>
      veterinaryServiceUsesCases.deleteVeterinaryService.execute(id),
    )
  }

  const getAllVeterinaryServices = async (): Promise<VeterinaryServiceView[]> => {
    const services: VeterinaryService[] = await runUseCase('getAllVeterinaryServices', () =>
      veterinaryServiceUsesCases.getAllVeterinaryServices.execute(),
    )
    return services.map(VeterinaryServiceAdapter.toView)
  }

  const getVeterinaryServiceById = async (id: number): Promise<VeterinaryServiceView> => {
    const service: VeterinaryService = await runUseCase('getVeterinaryServiceById', () =>
      veterinaryServiceUsesCases.getVeterinaryServiceById.execute(id),
    )
    return VeterinaryServiceAdapter.toView(service)
  }

  const updateVeterinaryService = async (
    id: number,
    schema: VeterinaryServiceAddEditSchema,
  ): Promise<VeterinaryServiceView> => {
    const request = VeterinaryServiceAdapter.fromSchemaAddEditToRequest(schema)
    const updated = await runUseCase('updateVeterinaryService', () =>
      veterinaryServiceUsesCases.updateVeterinaryService.execute(id, request),
    )
    return VeterinaryServiceAdapter.toView(updated)
  }

  const activateVeterinaryService = async (serviceId: number): Promise<void> => {
    await runUseCase('activateVeterinaryService', () =>
      veterinaryServiceUsesCases.activateVeterinaryService.execute(serviceId),
    )
  }

  const searchVeterinaryServices = async (
    page: number,
    size: number,
    name?: string,
    specie?: string,
    category?: string,
    status?: boolean
  ): Promise<PageResponse<VeterinaryServiceListView>> => {
      const result = await runUseCase('searchVeterinaryServices', () =>
        veterinaryServiceUsesCases.searchVeterinaryServices.execute(page, size,
          {
            name:name,
            specie:specie,
            category:category,
            status:status
          }
        ),
      )

      return {
        ...result,
        content: result.content.map(VeterinaryServiceAdapter.fromVeterinaryServiceListToVeterinaryServiceListView),
      }
    }


  const getTopServicesForAdmin = async (): Promise<ServicesInfoTopPanelAdminView[]> => {
    const services = await runUseCase('getTopServicesForAdmin', () =>
      veterinaryServiceUsesCases.getTopServicesForAdmin.execute()
    )
    return services.map((s)=>VeterinaryServiceAdapter.toServiceInfoTopPanelAdmin(s))
  }

  const getTopServicesForManager = async (headquarterId: number): Promise<ServicesInfoTopPanelAdminView[]> => {
    const services = await runUseCase('getTopServicesForManager', () =>
      veterinaryServiceUsesCases.getTopServicesForManager.execute(headquarterId)
    )
 return services.map((s)=>VeterinaryServiceAdapter.toServiceInfoTopPanelAdmin(s))
  }
  return {
    loading,
    error,
    createVeterinaryService,
    deleteVeterinaryService,
    getAllVeterinaryServices,
    getVeterinaryServiceById,
    updateVeterinaryService,
    activateVeterinaryService,
    searchVeterinaryServices,
    getTopServicesForAdmin,
    getTopServicesForManager
  }
}
