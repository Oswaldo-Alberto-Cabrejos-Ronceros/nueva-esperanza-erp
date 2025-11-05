import type { CareAndAppointmentPanelEmployee } from '@/services/Appointment/domain/models/Appointment'
import type {
  Care,
  CareList,
  CareRequest,
  CareRequestCreate,
  CareStatsToday,
  CreateCareFromAppointmentRequest,
  MonthlyCareStatsVeterinary,
  RecentPatient,
  WeeklyCareStatsVeterinary,
} from '../models/Care'
import type { PageResponse } from '@/services/models/PageResponse'

export interface CareService {
  getAllCares(): Promise<Care[]>
  getCareById(id: number): Promise<Care>
  getCareByAppointment(id: number): Promise<Care[]>
  createCare(careRequest: CareRequest): Promise<Care>
  completeCare(id: number): Promise<Care>
  updateCare(id: number, careRequest: CareRequest): Promise<Care>
  createCareFromAppointment(
    createCareFromAppointment: CreateCareFromAppointmentRequest,
  ): Promise<Care>
  createCareFromRequest(careRequest: CareRequestCreate): Promise<Care>
  searchCares(
    status?: string,
    fecha?: string,
    idHeadquarter?: number,
    idService?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<CareList>>
  getCaresForEmployee(employeeId: number): Promise<CareAndAppointmentPanelEmployee[]>
  getCareStatsToday(headquarterId: number): Promise<CareStatsToday>
  getCaresByHeadquarterId(headquarterId: number): Promise<CareAndAppointmentPanelEmployee[]>
  onGoingCare(id: number): Promise<Care>
  getRecentPatientsByEmployee(employeeId: number): Promise<RecentPatient[]>

  getMonthlyPerformanceStatsByVeterinary(employeeId: number): Promise<MonthlyCareStatsVeterinary>
  getWeeklyPerformanceGraphicByVeterinary(employeeId: number): Promise<WeeklyCareStatsVeterinary>

}
