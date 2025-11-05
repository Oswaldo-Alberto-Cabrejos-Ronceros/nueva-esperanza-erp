import type { BreedService } from '../domain/services/BreedService'
import type { Breed, BreedList, BreedRequest } from '../domain/models/Breed'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchBreedParams } from '../domain/models/SearchBreedParams'

export class BreedServiceImpl implements BreedService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/breed'

  async getBreedById(breedId: number): Promise<Breed> {
    const response = await this.httpClient.get<Breed>(`${this.url}/${breedId}`)
    return response.data
  }

  async getAllBreeds(): Promise<Breed[]> {
    const response = await this.httpClient.get<Breed[]>(this.url)
    return response.data
  }

  async getBreedsBySpecie(specieId: number): Promise<Breed[]> {
    const response = await this.httpClient.get<Breed[]>(`${this.url}/specie/${specieId}`)
    return response.data
  }

  async createBreed(breedRequest: BreedRequest): Promise<Breed> {
    const response = await this.httpClient.post<Breed>(this.url, breedRequest)
    return response.data
  }

  async updateBreed(breedId: number, breedRequest: BreedRequest): Promise<Breed> {
    const response = await this.httpClient.put<Breed>(`${this.url}/${breedId}`, breedRequest)
    return response.data
  }

  async deleteBreed(breedId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${breedId}`)
  }
  async activateBreed(breedId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.url}/${breedId}/activate`, {})
  }
  async searchBreeds(params: SearchBreedParams): Promise<PageResponse<BreedList>> {
    const queryParams: Record<string, string | number> = {}

    if (params.name) queryParams.name = params.name
    if (params.specieName) queryParams.specieName = params.specieName
    if (typeof params.status === 'boolean') queryParams.status = String(params.status)
    if (typeof params.page === 'number') queryParams.page = params.page
    if (typeof params.size === 'number') queryParams.size = params.size
    if (params.sort) queryParams.sort = params.sort

    const response = await this.httpClient.get<PageResponse<BreedList>>(`${this.url}/search`, {
      params:queryParams
    })
    return response.data
  }
}
