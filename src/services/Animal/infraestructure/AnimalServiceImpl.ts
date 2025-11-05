import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Animal, AnimalByClient, AnimalList, AnimalRequest } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'
import type { SearchAnimalParams } from '../domain/models/SearchAnimalParams'
import type { PageResponse } from '@/services/models/PageResponse'

export class AnimalServiceImpl implements AnimalService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/animal'
  async getAllAnimals(): Promise<Animal[]> {
    const response = await this.httpClient.get<Animal[]>(this.urlBase)
    return response.data
  }
  async getAnimalById(animalId: number): Promise<Animal> {
    const response = await this.httpClient.get<Animal>(`${this.urlBase}/${animalId}`)
    return response.data
  }
  async getAnimalByClientId(clientId: number): Promise<AnimalByClient[]> {
    const response = await this.httpClient.get<AnimalByClient[]>(
      `${this.urlBase}/client/${clientId}`,
    )
    return response.data
  }

  async createAnimal(animalRequest: AnimalRequest): Promise<void> {
    await this.httpClient.post<Animal>(this.urlBase, animalRequest)
  }
  async updateAnimal(animalId: number, animalRequest: AnimalRequest) {
    await this.httpClient.put<Animal>(`${this.urlBase}/${animalId}`, animalRequest)
  }
  async deleteAnimal(animalId: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${animalId}`)
  }
  async activateAnimal(animalId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${animalId}/activate`, {})
  }
  async searchAnimals(params: SearchAnimalParams): Promise<PageResponse<AnimalList>> {
    const queryParams: Record<string, string | number> = {}

    if (params.name) queryParams.name = params.name
    if (params.owner) queryParams.owner = params.owner
    if (params.specie) queryParams.specie = params.specie
    if (params.breed) queryParams.breed = params.breed
    if (params.gender) queryParams.gender = params.gender
    if (typeof params.status === 'boolean') queryParams.status = String(params.status)
    if (typeof params.page === 'number') queryParams.page = params.page
    if (typeof params.size === 'number') queryParams.size = params.size
    if (params.sort) queryParams.sort = params.sort

    const response = await this.httpClient.get<PageResponse<AnimalList>>(
      `${this.urlBase}/search`,
      {
        params:queryParams
      },
    )
    return response.data
  }

  async updateAnimalWeight(id: number, weight: number): Promise<{ name: string; weight: number }> {
  const response = await this.httpClient.patch<{ name: string; weight: number }>(
    `${this.urlBase}/${id}/weight`,
    { weight },
  )
  return response.data
}
}
