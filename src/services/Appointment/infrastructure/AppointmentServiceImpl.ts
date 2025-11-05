import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { AppointmentService } from '../domain/services/AppointmentService'
import type {
  Appointment,
  AppointmentRequest,
  TimesForTurn,
  BasicServiceForAppointment,
  InfoBasicAppointment,
  AppointmentList,
  InfoAppointmentForPanel,
  AnimalInfoForAppointment,
  ClientInfoForAppointment,
  AppointmentStatsToday,
  AppointmentInfoPanelAdmin,
  CareAndAppointmentPanelEmployee,
  AppointmentStatsForReceptionist,
  OperationalMonthlyStats,
  DailyAppointmentStats,
  VeterinarianPerformance,
} from '../domain/models/Appointment'
import type { SearchAppointmentParams } from '../domain/models/SearchAppointmentParams'
import type { PageResponse } from '@/services/models/PageResponse'
import type { PaymentInfoForAppointment } from '@/services/Payment/domain/models/Payment'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export class AppointmentServiceImpl implements AppointmentService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/appointments'

  async getAllAppointments(): Promise<Appointment[]> {
    const response = await this.httpClient.get<Appointment[]>(`${this.url}`)
    return response.data
  }

  async getAppointmentById(appointmentId: number): Promise<Appointment> {
    const response = await this.httpClient.get<Appointment>(`${this.url}/${appointmentId}`)
    return response.data
  }
  async createAppointment(appointmentRequest: AppointmentRequest): Promise<Appointment> {
    const response = await this.httpClient.post<Appointment>(`${this.url}`, appointmentRequest)
    return response.data
  }
  async updateAppointment(
    appoinmentId: number,
    appoimentRequest: AppointmentRequest,
  ): Promise<Appointment> {
    const response = await this.httpClient.put<Appointment>(
      `${this.url}/${appoinmentId}`,
      appoimentRequest,
    )
    return response.data
  }
  async deleteAppointment(appoinmentId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${appoinmentId}`)
  }
  async confirmAppointment(appoinmentId: number): Promise<Appointment> {
    const response = await this.httpClient.patch<Appointment>(`${this.url}/${appoinmentId}/confirm`)
    return response.data
  }
  async completeAppointment(appoinmentId: number): Promise<Appointment> {
    const response = await this.httpClient.patch<Appointment>(
      `${this.url}/${appoinmentId}/complete`,
    )
    return response.data
  }
  async getAvailableTimes(headquarterVetServiceId: number, date: string): Promise<TimesForTurn[]> {
    const params = new URLSearchParams()
    //for headquarterVetServiceI
    params.append('headquarterVetServiceId', headquarterVetServiceId.toString())
    params.append('date', date)
    const response = await this.httpClient.get<TimesForTurn[]>(
      `${this.url}/available-times?${params.toString()}`,
    )
    return response.data
  }
  async getServicesByHeadquarterAndSpecies(
    headquarterId: number,
    speciesId: number,
  ): Promise<BasicServiceForAppointment[]> {
    const params = new URLSearchParams()
    params.append('headquarterId', headquarterId.toString())
    params.append('speciesId', speciesId.toString())
    const response = await this.httpClient.get<BasicServiceForAppointment[]>(
      `${this.url}/services?${params.toString()}`,
    )
    return response.data
  }

  async getAppointmentsForClient(clientId: number): Promise<InfoBasicAppointment[]> {
    const response = await this.httpClient.get<InfoBasicAppointment[]>(
      `${this.url}/client/${clientId}/panel`,
    )
    return response.data
  }

  async searchAppointments(
    params: SearchAppointmentParams,
  ): Promise<PageResponse<AppointmentList>> {
    const queryParams: Record<string, string | number> = {}

    if (params.day) queryParams.day = params.day
    if (params.headquarter) queryParams.headquarter = params.headquarter
    if (params.categoryService) queryParams.categoryService = params.categoryService
    if (params.appointmentStatus) queryParams.appointmentStatus = params.appointmentStatus
    if (params.page !== undefined) queryParams.page = params.page
    if (params.size !== undefined) queryParams.size = params.size
    if (params.sort) queryParams.sort = params.sort

    const response = await this.httpClient.get<PageResponse<AppointmentList>>(
      `${this.url}/search`,
      {
        params: queryParams,
      },
    )
    return response.data
  }

  async getAppointmentPanelInfo(appointmentId: number): Promise<InfoAppointmentForPanel> {
    const response = await this.httpClient.get<InfoAppointmentForPanel>(
      `${this.url}/panel-info/${appointmentId}`,
    )
    return response.data
  }

  async getAnimalInfo(appointmentId: number): Promise<AnimalInfoForAppointment> {
    const response = await this.httpClient.get<AnimalInfoForAppointment>(
      `${this.url}/panel-info/${appointmentId}/animal-info`,
    )
    return response.data
  }

  async getClientInfo(appointmentId: number): Promise<ClientInfoForAppointment> {
    const response = await this.httpClient.get<ClientInfoForAppointment>(
      `${this.url}/panel-info/${appointmentId}/client-info`,
    )
    return response.data
  }

  async getPaymentInfo(appointmentId: number): Promise<PaymentInfoForAppointment> {
    const response = await this.httpClient.get<PaymentInfoForAppointment>(
      `${this.url}/panel-info/${appointmentId}/payment-info`,
    )
    return response.data
  }
  async getTodayAppointmentStats(): Promise<AppointmentStatsToday> {
    const response = await this.httpClient.get<AppointmentStatsToday>(
      `${this.url}/panel-admin/stats/today`,
    )
    return response.data
  }
  async getAppointmentsByDateForPanelAdmin(): Promise<AppointmentInfoPanelAdmin[]> {
    const response = await this.httpClient.get<AppointmentInfoPanelAdmin[]>(
      `${this.url}/panel-admin/by-date`,
    )
    return response.data
  }

  async getAppointmentsByDateForPanelManager(
    headquarterId: number,
  ): Promise<AppointmentInfoPanelAdmin[]> {
    const response = await this.httpClient.get<AppointmentInfoPanelAdmin[]>(
      `${this.url}/panel-manager/${headquarterId}/by-date`,
    )
    return response.data
  }

  async getTodayAppointmentStatsByHeadquarter(
    headquarterId: number,
  ): Promise<AppointmentStatsToday> {
    const response = await this.httpClient.get<AppointmentStatsToday>(
      `${this.url}/panel-manager/stats/${headquarterId}/today`,
    )
    return response.data
  }

  async getCareAndAppointmentsForEmployee(
    employeeId: number,
  ): Promise<CareAndAppointmentPanelEmployee[]> {
    const response = await this.httpClient.get<CareAndAppointmentPanelEmployee[]>(
      `${this.url}/panel-employee/${employeeId}`,
    )
    return response.data
  }
  async getStatsForReceptionist(headquarterId: number): Promise<AppointmentStatsForReceptionist> {
    const response = await this.httpClient.get<AppointmentStatsForReceptionist>(
      `${this.url}/panel-receptionist/${headquarterId}/stats`,
    )
    return response.data
  }

  async getAppointmentsByHeadquarterId(
    headquarterId: number,
  ): Promise<CareAndAppointmentPanelEmployee[]> {
    const response = await this.httpClient.get<CareAndAppointmentPanelEmployee[]>(
      `${this.url}/panel-receptionist/${headquarterId}`,
    )
    return response.data
  }

  async getOperationalMonthlyStatsByHeadquarter(
    headquarterId: number,
  ): Promise<OperationalMonthlyStats> {
    const response = await this.httpClient.get<OperationalMonthlyStats>(
      `/panel-manager/cares/monthly/operational/by-headquarter/${headquarterId}`,
    )
    return response.data
  }

  async getDailyAppointmentStatsByHeadquarter(
    headquarterId: number,
  ): Promise<DailyAppointmentStats> {
    const response = await this.httpClient.get<DailyAppointmentStats>(
      `/panel-manager/cares/appointments/daily-stats/headquarter/${headquarterId}`,
    )
    return response.data
  }

  async getGeneralOperationalMonthlyStats(): Promise<OperationalMonthlyStats> {
    const response = await this.httpClient.get<OperationalMonthlyStats>(
      `/panel-admin/monthly-stats/operational/general`,
    )
    return response.data
  }
  async getDailyAppointmentStatsLast7Days(): Promise<DailyAppointmentStats> {
    const response = await this.httpClient.get<DailyAppointmentStats>(
      `/panel-admin/appointments/daily-stats`,
    )
    return response.data
  }

  async getTopVeterinariansPerformance(period: ReportPeriod): Promise<VeterinarianPerformance> {
    const response = await this.httpClient.get<VeterinarianPerformance>(
      `panel-admin/top-veterinarians/${period}`,
    )
    return response.data
  }

  async getTopVeterinariansPerformanceByHeadquarter(
    period: ReportPeriod,
    headquarterId: number,
  ): Promise<VeterinarianPerformance> {
    const response = await this.httpClient.get<VeterinarianPerformance>(
      `panel-manager/top-veterinarians/${period}/headquarter/${headquarterId}`,
    )
    return response.data
  }
}
