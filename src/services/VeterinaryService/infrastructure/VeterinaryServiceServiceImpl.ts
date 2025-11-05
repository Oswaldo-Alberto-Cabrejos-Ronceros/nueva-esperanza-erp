import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'
import type {
  VeterinaryService,
  VeterinaryServiceList,
  VeterinaryServiceRequest,
  ServicesInfoTopPanelAdmin,
} from '../domain/models/VeterinaryService'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'

export class VeterinaryServiceServiceImpl implements VeterinaryServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/veterinary-services'

  async getVeterinaryServiceById(serviceId: number): Promise<VeterinaryService> {
    const response = await this.httpClient.get<VeterinaryService>(`${this.url}/${serviceId}`)
    return response.data
  }

  async getAllVeterinaryServices(): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(this.url)
    return response.data
  }

  async getAllServicesBySpecie(specieId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(
      `${this.url}/specie/${specieId}`
    )
    return response.data
  }

  async getAllServicesByCategory(categoryId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(
      `${this.url}/category/${categoryId}`
    )
    return response.data
  }

  async createVeterinaryService(serviceRequest: VeterinaryServiceRequest): Promise<VeterinaryService> {
    const response = await this.httpClient.post<VeterinaryService>(this.url, serviceRequest)
    return response.data
  }

  async updateVeterinaryService(
    serviceId: number,
    serviceRequest: VeterinaryServiceRequest
  ): Promise<VeterinaryService> {
    const response = await this.httpClient.put<VeterinaryService>(
      `${this.url}/${serviceId}`,
      serviceRequest
    )
    return response.data
  }

  async deleteVeterinaryService(serviceId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${serviceId}`)
  }

  async activateVeterinaryService(serviceId: number): Promise<void> {
    await this.httpClient.put(`${this.url}/${serviceId}/activate`, {})
  }

  async searchVeterinaryServices(
    page: number,
    size: number,
    filters: {
      name?: string
      specie?: string
      category?: string
      status?: boolean
    },
    sort?: string
  ): Promise<PageResponse<VeterinaryServiceList>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (filters.name) params.name = filters.name
    if (filters.specie) params.specie = filters.specie
    if (filters.category) params.category = filters.category
    if (filters.status !== undefined) params.status = String(filters.status)
    if (sort) params.sort = sort

    const response = await this.httpClient.get<PageResponse<VeterinaryServiceList>>(
      `${this.url}/search`,
      { params:params }
    )

    return response.data
  }

  async getTopServicesForAdmin(): Promise<ServicesInfoTopPanelAdmin[]> {
    const response = await this.httpClient.get<ServicesInfoTopPanelAdmin[]>(
      `${this.url}/panel-admin/top-services`
    )
    return response.data
  }

  async getTopServicesForManager(headquarterId: number): Promise<ServicesInfoTopPanelAdmin[]> {
    const response = await this.httpClient.get<ServicesInfoTopPanelAdmin[]>(
      `${this.url}/panel-manager/top-services/${headquarterId}`
    )
    return response.data
  }
}
