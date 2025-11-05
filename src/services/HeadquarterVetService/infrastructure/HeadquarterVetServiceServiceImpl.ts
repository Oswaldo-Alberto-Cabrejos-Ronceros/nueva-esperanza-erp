import type {
  HeadquarterServiceInfoPanel,
  HeadquarterVetService,
} from '../domain/models/HeadquarterVetService'
import type { EmployeeBasicInfo } from '@/services/Employee/domain/models/Employee'
import type { HeadquarterVetServiceRequest } from '../domain/models/HeadquarterVetService'
import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'

export class HeadquarterVetServiceServiceImpl implements HeadquarterVetServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly urlBase = '/headquarter-vet-services'

  async getAll(): Promise<HeadquarterVetService[]> {
    const response = await this.httpClient.get<HeadquarterVetService[]>(this.urlBase)
    return response.data
  }
  async getById(id: number): Promise<HeadquarterVetService> {
    const response = await this.httpClient.get<HeadquarterVetService>(`${this.urlBase}/${id}`)
    return response.data
  }
  async getByHeadquarter(headquarterId: number): Promise<HeadquarterVetService[]> {
    const response = await this.httpClient.get<HeadquarterVetService[]>(
      `${this.urlBase}/headquarter/${headquarterId}`,
    )
    return response.data
  }

  async getAllHeadquarterVetServiceByHeadquarter(
    headquarterId: number,
  ): Promise<HeadquarterVetService[]> {
    const response = await this.httpClient.get<HeadquarterVetService[]>(
      `${this.urlBase}/headquarter/${headquarterId}/all`,
    )
    return response.data
  }

  async create(request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService> {
    const response = await this.httpClient.post<HeadquarterVetService>(this.urlBase, request)
    return response.data
  }
  async update(id: number, request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService> {
    const response = await this.httpClient.put<HeadquarterVetService>(
      `${this.urlBase}/${id}`,
      request,
    )
    return response.data
  }
  async delete(id: number): Promise<void> {
    const response = await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
    return response.data
  }

  async listVeterinariansByHeadVetService(
    headquarterVetServiceId: number,
  ): Promise<EmployeeBasicInfo[]> {
    const params: Record<string, string | number> = {
      headquarterVetServiceId: headquarterVetServiceId,
    }
    const response = await this.httpClient.get<EmployeeBasicInfo[]>(
      `${this.urlBase}/veterinarians`,
      {params:params},
    )
    return response.data
  }

  async enableHeadquarterVetService(id: number): Promise<void> {
    await this.httpClient.patch(`${this.urlBase}/${id}/activate`)
  }

  async updateSimultaneousCapacity(id: number, capacity: number): Promise<void> {
    const body = { simultaneousCapacity: capacity }
    await this.httpClient.patch(`${this.urlBase}/${id}/capacity`, body)
  }

  async filterHeadquarterServices(
    page: number,
    size: number,
    filters: {
      serviceName?: string
      categoryId?: number
      speciesId?: number
      headquarterId?: number
    },
  ): Promise<PageResponse<HeadquarterServiceInfoPanel>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (filters.serviceName) params.serviceName = filters.serviceName
    if (filters.categoryId !== undefined) params.categoryId = filters.categoryId
    if (filters.speciesId !== undefined) params.speciesId = filters.speciesId
    if (filters.headquarterId !== undefined) params.headquarterId = filters.headquarterId

    const response = await this.httpClient.get<PageResponse<HeadquarterServiceInfoPanel>>(
      '/headquarter-vet-services/filter',
      { params: params },
    )
    return response.data
  }
}
