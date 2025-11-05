import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { VeterinaryRecordRequest, VeterinaryRecord, VeterinaryRecordInfoTable, RecentMedicalRecord, VeterinaryRecordStats } from '../domain/models/VeterinaryRecord'
import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'
import type { PageResponse } from '@/services/models/PageResponse'

export class VeterinaryRecordServiceImpl implements VeterinaryRecordService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/veterinary-records'

  async create(veterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord> {
    const response = await this.httpClient.post<VeterinaryRecord>(this.url, veterinaryRecordRequest)
    return response.data
  }
  async update(
    id: number,
    veterinaryRecordRequest: VeterinaryRecordRequest,
  ): Promise<VeterinaryRecord> {
    const response = await this.httpClient.put<VeterinaryRecord>(
      `${this.url}/${id}`,
      veterinaryRecordRequest,
    )
    console.log('desde service',response)
    return response.data
  }
  async findAll(): Promise<VeterinaryRecord[]> {
    const response = await this.httpClient.get<VeterinaryRecord[]>(this.url)
    return response.data
  }
  async findById(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.get<VeterinaryRecord>(`${this.url}/${id}`)
    return response.data
  }

  async setEnCurso(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(`${this.url}/${id}/status/curso`)
    return response.data
  }

  async setCompletado(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(
      `${this.url}/${id}/status/completado`,
    )
    return response.data
  }
  async setObservacion(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(
      `${this.url}/${id}/status/observacion`,
    )
    return response.data
  }
  async getAllInfoVeterinaryRecordsByAnimal(
    animalId: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<VeterinaryRecordInfoTable>> {
    const params = new URLSearchParams()
    if (page) params.append('page', String(page))
    if (size) params.append('size', String(size))
    const response = await this.httpClient.get<PageResponse<VeterinaryRecordInfoTable>>(
      `${this.url}/animal/${animalId}?${params.toString()}`,
    )
    return response.data
  }
    async getRecentRecordsByEmployee(employeeId: number): Promise<RecentMedicalRecord[]> {
    const response = await this.httpClient.get<RecentMedicalRecord[]>(
      `/panel-veterinarians/recent-medical-records/${employeeId}`,
    )
    return response.data
  }
    async getStatsByVeterinarian(employeeId: number): Promise<VeterinaryRecordStats> {
    const response = await this.httpClient.get<VeterinaryRecordStats>(
      `/panel-veterinarians/medical-records/statistics/${employeeId}`
    )
    return response.data
  }

  async getRecordsByAnimalId(animalId: number): Promise<VeterinaryRecordInfoTable[]> {
  const response = await this.httpClient.get<VeterinaryRecordInfoTable[]>(
    `${this.url}/animal/${animalId}`
  )
  return response.data
}
}
