import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Care, CareList, CareRequest, CareRequestCreate, CareStatsToday, CreateCareFromAppointmentRequest, MonthlyCareStatsVeterinary, RecentPatient, WeeklyCareStatsVeterinary } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { CareAndAppointmentPanelEmployee } from '@/services/Appointment/domain/models/Appointment'

export class CareServiceImpl implements CareService {
  constructor(private readonly httpClient: HttpClient) {}



  private readonly urlBase = `/cares`

  async getAllCares(): Promise<Care[]> {
    const response = await this.httpClient.get<Care[]>(this.urlBase)
    return response.data
  }

  async getCareById(id: number): Promise<Care> {
    const response = await this.httpClient.get<Care>(`${this.urlBase}/${id}`)
    return response.data
  }
  async getCareByAppointment(id: number): Promise<Care[]> {
    const response = await this.httpClient.get<Care[]>(`${this.urlBase}/appointment/${id}`)
    return response.data
  }
  async createCare(careRequest: CareRequest): Promise<Care> {
    const response = await this.httpClient.post<Care>(this.urlBase, careRequest)
    return response.data
  }
  async completeCare(id: number): Promise<Care> {
    const response = await this.httpClient.patch<Care>(`${this.urlBase}/${id}/complete`)
    return response.data
  }
  async updateCare(id: number, careRequest: CareRequest): Promise<Care> {
    const response = await this.httpClient.put<Care>(`${this.urlBase}/${id}`, careRequest)
    return response.data
  }

  async  createCareFromAppointment(createCareFromAppointment: CreateCareFromAppointmentRequest): Promise<Care> {
    const response = await this.httpClient.post<Care>(`${this.urlBase}/from-appointment`,createCareFromAppointment)
    return response.data
  }

  async  createCareFromRequest(careRequest: CareRequestCreate): Promise<Care> {
    const response = await this.httpClient.post<Care>(`${this.urlBase}/from-request`,careRequest)
    return response.data
  }

  async searchCares(
    status?: string,
    fecha?: string,
    idHeadquarter?: number,
    idService?: number,
    page?: number,
    size?: number
  ): Promise<PageResponse<CareList>> {
    const params = new URLSearchParams()

    if (status) params.append('estado', status)
    if (fecha) params.append('fecha', fecha)
    if (idHeadquarter !== undefined) params.append('idHeadquarter', idHeadquarter.toString())
    if (idService !== undefined) params.append('idService', idService.toString())
    if (page !== undefined) params.append('page', page.toString())
    if (size !== undefined) params.append('size', size.toString())

    const response = await this.httpClient.get<PageResponse<CareList>>(
      `${this.urlBase}/search?${params.toString()}`
    )

    return response.data
  }

async getCaresForEmployee(employeeId: number): Promise<CareAndAppointmentPanelEmployee[]> {
  const response = await this.httpClient.get<CareAndAppointmentPanelEmployee[]>(
    `${this.urlBase}/panel-employee/${employeeId}`,
  )
  return response.data
}

async getCareStatsToday(headquarterId:number): Promise<CareStatsToday> {
  const response = await this.httpClient.get<CareStatsToday>(
    `${this.urlBase}/panel-receptionist/${headquarterId}/stats-today`,
  )
  return response.data
}

async getCaresByHeadquarterId(headquarterId: number): Promise<CareAndAppointmentPanelEmployee[]> {
  const response = await this.httpClient.get<CareAndAppointmentPanelEmployee[]>(
    `${this.urlBase}/panel-receptionist/${headquarterId}`,
  )
  return response.data
}

  async onGoingCare(id: number): Promise<Care> {
    const response = await this.httpClient.patch<Care>(`${this.urlBase}/${id}/on-going`, {})
    return response.data
  }

  async getRecentPatientsByEmployee(employeeId: number): Promise<RecentPatient[]> {
  const response = await this.httpClient.get<RecentPatient[]>(
    `panel-veterinarians/care/recent-patients/${employeeId}`,
  )
  return response.data
}

async getMonthlyPerformanceStatsByVeterinary(employeeId: number): Promise<MonthlyCareStatsVeterinary> {
  const response = await this.httpClient.get<MonthlyCareStatsVeterinary>(
    `/panel-veterinarians/care/performance-statistic/${employeeId}`,
  )
  return response.data
}

async getWeeklyPerformanceGraphicByVeterinary(employeeId: number): Promise<WeeklyCareStatsVeterinary> {
  const response = await this.httpClient.get<WeeklyCareStatsVeterinary>(
    `/panel-veterinarians/care/performance-statistic/graphic/${employeeId}`,
  )
  return response.data
}



}
