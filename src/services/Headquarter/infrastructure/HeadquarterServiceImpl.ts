import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { HeadquarterService } from '../domain/services/HeadquarterService'
import type { Headquarter, HeadquarterList, HeadquarterRequest } from '../domain/models/Headquarter'
import type { PageResponse } from '@/services/models/PageResponse'

export class HeadquarterServiceImpl implements HeadquarterService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/headquarters'

  async getAllHeadquarters(): Promise<Headquarter[]> {
    const response = await this.httpClient.get<Headquarter[]>(this.urlBase)
    return response.data
  }

  async getHeadquarterById(id: number): Promise<Headquarter> {
    const response = await this.httpClient.get<Headquarter>(`${this.urlBase}/${id}`)
    return response.data
  }

  async createHeadquarter(headquarterRequest: HeadquarterRequest): Promise<Headquarter> {
    const response = await this.httpClient.post<Headquarter>(this.urlBase, headquarterRequest)
    return response.data
  }

  async updateHeadquarter(
    id: number,
    headquarterRequest: HeadquarterRequest,
  ): Promise<Headquarter> {
    const response = await this.httpClient.put<Headquarter>(
      `${this.urlBase}/${id}`,
      headquarterRequest,
    )
    return response.data
  }

  async searchHeadquarters(
    page: number,
    size: number,
    name?: string,
    phone?: string,
    address?: string,
    email?: string,
    district?: string,
    province?: string,
    status?: boolean,
  ): Promise<PageResponse<HeadquarterList>> {
    const params: Record<string, string | number | boolean> = {
      page,
      size,
    }

    if (name) params.name = name
    if (phone) params.phone = phone
    if (address) params.address = address
    if (email) params.email = email
    if (district) params.district = district
    if (province) params.province = province
    if (status != undefined) params.status = status

    const response = await this.httpClient.get<PageResponse<HeadquarterList>>(
      `${this.urlBase}/search`,
      { params: params },
    )
    return response.data
  }

  async deleteHeadquarter(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }

  async activateHeadquarter(id: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${id}/activate`, {})
  }
}
