import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { ClinicReportService } from '../domain/services/ClinicReportService'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { AppointmentsByTime } from '../domain/models/AppointmentsByTime'
import type { AppointmentsByVet } from '../domain/models/AppointmentsByVet'
import type { PopularService } from '../domain/models/PopularService'
import type { AnimalByType } from '../domain/models/AnimalByType'
import type { AppointmentsByVetAndPeriod } from '../domain/models/AppointmentsByVetAndPeriod'
import type { CaresByVetAndHeadquarter } from '../domain/models/CaresByVetAndHeadquarter'

export class ClinicReportServiceImpl implements ClinicReportService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly baseUrl = '/reports/clinical'

  async getAppointmentsByPeriod(period: ReportPeriod): Promise<AppointmentsByTime[]> {
    const response = await this.httpClient.get<AppointmentsByTime[]>(
      `${this.baseUrl}/appointments/${period}`,
    )
    return response.data
  }

  async getAppointmentsByVet(): Promise<AppointmentsByVet[]> {
    const response = await this.httpClient.get<AppointmentsByVet[]>(`${this.baseUrl}/veterinarians`)
    return response.data
  }

  async getPopularServices(): Promise<PopularService[]> {
    const response = await this.httpClient.get<PopularService[]>(`${this.baseUrl}/popular-services`)
    return response.data
  }

  async getAnimalsBySpecieOrBreed(): Promise<AnimalByType[]> {
    const response = await this.httpClient.get<AnimalByType[]>(`${this.baseUrl}/animals`)
    return response.data
  }

  async getAppointmentsByVetAndPeriod(period: ReportPeriod): Promise<AppointmentsByVetAndPeriod[]> {
    const response = await this.httpClient.get<AppointmentsByVetAndPeriod[]>(
      `${this.baseUrl}/veterinarians/by-period/${period}`,
    )
    return response.data
  }

  async generateAppointmentsByPeriodPdf(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/appointments/${period}/pdf`, {
      responseType: 'blob',
    })
    return response.data
  }

  async generateAppointmentsByPeriodExcel(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/appointments/${period}/excel`,
      { responseType: 'blob' },
    )
    return response.data
  }

  async generateAppointmentsByVetPdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/veterinarians/pdf`,

      { responseType: 'blob' },
    )
    return response.data
  }

  async generatePopularServicesPdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/popular-services/pdf`, {
      responseType: 'blob',
    })
    return response.data
  }

  async generateAnimalsBySpecieOrBreedPdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/animals/pdf`,

      { responseType: 'blob' },
    )
    return response.data
  }

  async generateAppointmentsByVetAndPeriodPdf(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/veterinarians/by-period/${period}/pdf`,

      { responseType: 'blob' },
    )
    return response.data
  }

  async generateAppointmentsByVetAndPeriodExcel(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/veterinarians/by-period/${period}/excel`,

      { responseType: 'blob' },
    )
    return response.data
  }

  async getCaresByVetAndHeadquarter(): Promise<CaresByVetAndHeadquarter[]> {
  const response = await this.httpClient.get<CaresByVetAndHeadquarter[]>(
    `/reports/clinical/veterinarians/by-headquarter/cares`
  )
  return response.data
}

async getCaresByVetAndHeadquarterPdf(): Promise<Blob> {
  const response = await this.httpClient.get<Blob>(
    `/reports/clinical/veterinarians/by-headquarter/cares/pdf`,
    { responseType: 'blob' }
  )
  return response.data
}
}
