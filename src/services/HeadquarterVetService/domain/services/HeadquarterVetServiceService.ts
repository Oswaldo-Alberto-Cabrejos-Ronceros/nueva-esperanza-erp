import type { PageResponse } from '@/services/models/PageResponse'
import type { HeadquarterServiceInfoPanel, HeadquarterVetService } from '../models/HeadquarterVetService'
import type { HeadquarterVetServiceRequest } from '../models/HeadquarterVetService'
import type { EmployeeBasicInfo } from '@/services/Employee/domain/models/Employee'

export interface HeadquarterVetServiceService {
  getAll(): Promise<HeadquarterVetService[]>
  getById(id: number): Promise<HeadquarterVetService>
  getByHeadquarter(headquarterId: number): Promise<HeadquarterVetService[]>
  getAllHeadquarterVetServiceByHeadquarter(headquarterId: number): Promise<HeadquarterVetService[]>
  create(request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService>
  update(id: number, request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService>
  delete(id: number): Promise<void>
  listVeterinariansByHeadVetService(headquarterVetServiceId: number): Promise<EmployeeBasicInfo[]>
  enableHeadquarterVetService(id: number): Promise<void>
  updateSimultaneousCapacity(id: number, capacity: number): Promise<void>
  filterHeadquarterServices(
    page: number,
    size: number,
    filters: {
      serviceName?: string
      categoryId?: number
      speciesId?: number
      headquarterId?: number
    },
  ): Promise<PageResponse<HeadquarterServiceInfoPanel>>
}
