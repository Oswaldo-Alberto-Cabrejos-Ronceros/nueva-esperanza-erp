import type { SpecieService } from '../domain/services/SpecieService'
import type {
  Specie,
  SpecieRequest,
  SpecieList,
  TopSpeciesByAppointments,
  TopSpeciesCare,
} from '../domain/models/Specie'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export class SpecieServiceImpl implements SpecieService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/species'

  async getSpecieById(specieId: number): Promise<Specie> {
    const response = await this.httpClient.get<Specie>(`${this.url}/${specieId}`)
    return response.data
  }

  async getAllSpecies(): Promise<Specie[]> {
    const response = await this.httpClient.get<Specie[]>(this.url)
    return response.data
  }

  async createSpecie(specieRequest: SpecieRequest): Promise<Specie> {
    const response = await this.httpClient.post<Specie>(this.url, specieRequest)
    return response.data
  }

  async updateSpecie(specieId: number, specieRequest: SpecieRequest): Promise<Specie> {
    const response = await this.httpClient.put<Specie>(`${this.url}/${specieId}`, specieRequest)
    return response.data
  }

  async deleteSpecie(specieId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${specieId}`)
  }

  async activateSpecie(specieId: number): Promise<void> {
    await this.httpClient.put(`${this.url}/${specieId}/activate`, {})
  }

  async searchSpecies(
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<SpecieList>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }
    if (name) params.name = name
    if (status !== undefined) params.status = String(status)

    const response = await this.httpClient.get<PageResponse<SpecieList>>(`${this.url}/search`, {
      params: params,
    })
    return response.data
  }

  async getTopSpeciesGeneral(): Promise<TopSpeciesByAppointments> {
    const response = await this.httpClient.get<TopSpeciesByAppointments>(
      `/panel-admin/appointments/top-species`,
    )
    return response.data
  }
  async getTopSpeciesByHeadquarter(headquarterId: number): Promise<TopSpeciesByAppointments> {
    const response = await this.httpClient.get<TopSpeciesByAppointments>(
      `/panel-manager/appointments/top-species/${headquarterId}`,
    )
    return response.data
  }

  async getTopSpeciesByPeriod(period: ReportPeriod): Promise<TopSpeciesCare> {
    const response = await this.httpClient.get<TopSpeciesCare>(
      `/panel-admin/top-specie/${period}`,
    )
    return response.data
  }

  async getTopSpeciesByPeriodAndHeadquarter(
    period: ReportPeriod,
    headquarterId: number,
  ): Promise<TopSpeciesCare> {
    const response = await this.httpClient.get<TopSpeciesCare>(
      ` /manager-panel/top-specie/${period}/headquarter/${headquarterId}`,
    )
    return response.data
  }
}
