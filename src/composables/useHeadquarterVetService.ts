import type { HeadquarterVetService as HeadquarterVetServiceView } from '@/models/HeadquarterVetService'
import { useAsyncHandler } from './useAsyncHandler'
import { headquarterVetServiceUsesCases } from '@/dependency-injection/headquarter-vet-service.container'
import { HeadquarterVetServiceAdapter } from '@/adapters/HeadquarterVetServiceAdapter'
import type { EmployeeBasicInfo as EmployeeBasicInfoView } from '@/models/EmployeeBasicInfo'
import { EmployeeAdapter } from '@/adapters/EmployeeAdapter'
import type { FormValues as AddHeadquarterVetServiceSchema } from '@/validation-schemas-forms/schema-add-headquarter-vet-service'
import type { HeadquarterServiceInfoPanel as HeadquarterServiceInfoPanelView } from '@/models/HeadquarterServiceInfoPanel'
import type { PageResponse } from '@/services/models/PageResponse'

export function useHeadquarterVetService() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()
  //expose use casos
  const createHeadquarterVetService = async (
    schema: AddHeadquarterVetServiceSchema,
  ): Promise<HeadquarterVetServiceView> => {
    const request = HeadquarterVetServiceAdapter.fromSchemaToRequest(schema)
    const service = await runUseCase('createHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.createHeadquarterVetService.execute(request),
    )
    return HeadquarterVetServiceAdapter.toHeadquarterVetServiceView(service)
  }

  const deleteHeadquarterVetService = async (id: number): Promise<void> => {
    await runUseCase('deleteHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.deleteHeadquarterVetService.execute(id),
    )
  }

  const getAllHeadquarterVetService = async (): Promise<HeadquarterVetServiceView[]> => {
    const services = await runUseCase('getAllHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.getAllHeadquarterVetService.execute(),
    )
    return services.map(HeadquarterVetServiceAdapter.toHeadquarterVetServiceView)
  }

  const getHeadquarterVetServiceByHeadquarter = async (
    headquarterId: number,
  ): Promise<HeadquarterVetServiceView[]> => {
    const services = await runUseCase('getHeadquarterVetServiceByHeadquarter', () =>
      headquarterVetServiceUsesCases.getHeadquarterVetServiceByHeadquarter.execute(headquarterId),
    )
    return services.map(HeadquarterVetServiceAdapter.toHeadquarterVetServiceView)
  }

  const getAllHeadquarterVetServiceByHeadquarter = async (
    headquarterId: number,
  ): Promise<HeadquarterVetServiceView[]> => {
    const services = await runUseCase('getAllHeadquarterVetServiceByHeadquarter', () =>
      headquarterVetServiceUsesCases.getAllHeadquarterVetServiceByHeadquarter.execute(
        headquarterId,
      ),
    )
    return services.map(HeadquarterVetServiceAdapter.toHeadquarterVetServiceView)
  }

  const getHeadquarterVetServiceById = async (id: number): Promise<HeadquarterVetServiceView> => {
    const service = await runUseCase('getHeadquarterVetServiceById', () =>
      headquarterVetServiceUsesCases.getHeadquarterVetServiceById.execute(id),
    )
    return HeadquarterVetServiceAdapter.toHeadquarterVetServiceView(service)
  }

  const listVeterinariansByHeadVetService = async (
    headquarterVetServiceId: number,
  ): Promise<EmployeeBasicInfoView[]> => {
    const employees = await runUseCase('listVeterinariansByHeadVetService', () =>
      headquarterVetServiceUsesCases.listVeterinariansByHeadVetService.execute(
        headquarterVetServiceId,
      ),
    )
    return employees.map(EmployeeAdapter.fromEmployeeBasicInfoToEmployeeBasicInfoView)
  }

  const enableHeadquarterVetService = async (id: number): Promise<void> => {
    await runUseCase('enableHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.enableHeadquarterVetService.execute(id),
    )
  }

  const updateSimultaneousCapacity = async (id: number, capacity: number): Promise<void> => {
    console.log(id, capacity)
    await runUseCase('updateSimultaneousCapacity', () =>
      headquarterVetServiceUsesCases.updateSimultaneousCapacity.execute(id, capacity),
    )
  }

  const filterHeadquarterVetServices = async (
    page: number,
    size: number,
    filters: {
      serviceName?: string
      categoryId?: number
      speciesId?: number
      headquarterId?: number
    },
  ): Promise<PageResponse<HeadquarterServiceInfoPanelView>> => {
    const result = await runUseCase('filterHeadquarterVetServices', () =>
      headquarterVetServiceUsesCases.filterHeadquarterVetServices.execute(page, size, filters),
    )

    return {
      ...result,
      content: result.content.map(HeadquarterVetServiceAdapter.fromPanelInfoToPanelInfoView),
    }
  }

  return {
    loading,
    error,
    createHeadquarterVetService,
    deleteHeadquarterVetService,
    getAllHeadquarterVetService,
    getHeadquarterVetServiceByHeadquarter,
    getHeadquarterVetServiceById,
    listVeterinariansByHeadVetService,
    enableHeadquarterVetService,
    updateSimultaneousCapacity,
    getAllHeadquarterVetServiceByHeadquarter,
    filterHeadquarterVetServices
  }
}
