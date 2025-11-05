import { CompleteAppointment } from '@/services/Appointment/aplication/CompleteAppointment'
import { ConfirmAppointment } from '@/services/Appointment/aplication/ConfirmAppointment'
import { CreateAppointment } from '@/services/Appointment/aplication/CreateAppointment'
import { DeleteAppointment } from '@/services/Appointment/aplication/DeleteAppointment'
import { GetAllAppointments } from '@/services/Appointment/aplication/GetAllAppointments'
import { GetAppointmentById } from '@/services/Appointment/aplication/GetAppointmentById'
import { GetAvailableTimes } from '@/services/Appointment/aplication/GetAvailableTimes'
import { GetServicesByHeadquarterAndSpecies } from '@/services/Appointment/aplication/GetServicesByHeadquarterAndSpecies'
import { UpdateAppointment } from '@/services/Appointment/aplication/UpdateAppointment'
import { GetAppointmentsForClient } from '@/services/Appointment/aplication/GetAppointmentsForClient'
import { SearchAppointments } from '@/services/Appointment/aplication/SearchAppointment'
import { GetAppointmentPanelInfo } from '@/services/Appointment/aplication/GetAppointmentPanelInfo'
import { GetAnimalInfoForAppointment } from '@/services/Appointment/aplication/GetAnimalInfoForAppointment'
import { GetClientInfoForAppointment } from '@/services/Appointment/aplication/GetClientInfoForAppointment'
import { GetPaymentInfoForAppointment } from '@/services/Appointment/aplication/GetPaymentInfoForAppointment'
import { GetTodayAppointmentStats } from '@/services/Appointment/aplication/GetTodayAppointmentStats'

import { AppointmentServiceImpl } from '@/services/Appointment/infrastructure/AppointmentServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { GetAppointmentsByDateForPanelAdmin } from '@/services/Appointment/aplication/GetAppointmentsByDateForPanelAdmin'
import { GetAppointmentsByDateForPanelManager } from '@/services/Appointment/aplication/GetAppointmentsByDateForPanelManager'
import { GetTodayAppointmentStatsByHeadquarter } from '@/services/Appointment/aplication/GetTodayAppointmentStatsByHeadquarter'
import { GetCareAndAppointmentsForEmployee } from '@/services/Appointment/aplication/GetCareAndAppointmentsForEmployee'
import { GetStatsForReceptionistUseCase } from '@/services/Appointment/aplication/GetStatsForReceptionist'
import { GetAppointmentsByHeadquarterIdUseCase } from '@/services/Appointment/aplication/GetAppointmentsByHeadquarterId'
import { GetOperationalMonthlyStatsByHeadquarter } from '@/services/Appointment/aplication/GetOperationalMonthlyStatsByHeadquarter'
import { GetDailyAppointmentStatsByHeadquarter } from '@/services/Appointment/aplication/GetDailyAppointmentStatsByHeadquarter'
import { GetGeneralOperationalMonthlyStats } from '@/services/Appointment/aplication/GetGeneralOperationalMonthlyStats'
import { GetDailyAppointmentStatsLast7Days } from '@/services/Appointment/aplication/GetDailyAppointmentStatsLast7Days'
import { GetTopVeterinariansPerformanceByHeadquarter } from '@/services/Appointment/aplication/GetTopVeterinariansPerformanceByHeadquarter'
import { GetTopVeterinariansPerformance } from '@/services/Appointment/aplication/GetTopVeterinariansPerformance'

// Instancia de cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia de implementación del servicio de citas
const appointmentService = new AppointmentServiceImpl(axiosHttpClient)

// Exposición de casos de uso con inyección de dependencias
export const appointmentUsesCases = {
  completeAppointment: new CompleteAppointment(appointmentService),
  confirmAppointment: new ConfirmAppointment(appointmentService),
  createAppointment: new CreateAppointment(appointmentService),
  deleteAppointment: new DeleteAppointment(appointmentService),
  getAllAppointments: new GetAllAppointments(appointmentService),
  getAppointmentById: new GetAppointmentById(appointmentService),
  getAvailableTimes: new GetAvailableTimes(appointmentService),
  getServicesByHeadquarterAndSpecies: new GetServicesByHeadquarterAndSpecies(appointmentService),
  updateAppointment: new UpdateAppointment(appointmentService),
  getAppointmentsForClient: new GetAppointmentsForClient(appointmentService),
  searchAppointment: new SearchAppointments(appointmentService),
  getAppointmentPanelInfo: new GetAppointmentPanelInfo(appointmentService),
  getAnimalInfoForAppointment: new GetAnimalInfoForAppointment(appointmentService),
  getClientInfoForAppointment: new GetClientInfoForAppointment(appointmentService),
  getPaymentInfoForAppointment: new GetPaymentInfoForAppointment(appointmentService),
  getTodayAppointmentStats: new GetTodayAppointmentStats(appointmentService),

  getAppointmentsByDateForPanelAdmin: new GetAppointmentsByDateForPanelAdmin(appointmentService),
  getAppointmentsByDateForPanelManager: new GetAppointmentsByDateForPanelManager(
    appointmentService,
  ),
  getTodayAppointmentStatsByHeadquarter: new GetTodayAppointmentStatsByHeadquarter(
    appointmentService,
  ),
  getCareAndAppointmentsForEmployeeUseCase: new GetCareAndAppointmentsForEmployee(
    appointmentService,
  ),

  getStatsForReceptionist: new GetStatsForReceptionistUseCase(appointmentService),
  getAppointmentsByHeadquarterId: new GetAppointmentsByHeadquarterIdUseCase(appointmentService),

  getOperationalMonthlyStatsByHeadquarter: new GetOperationalMonthlyStatsByHeadquarter(
    appointmentService,
  ),
  getDailyAppointmentStatsByHeadquarter: new GetDailyAppointmentStatsByHeadquarter(
    appointmentService,
  ),
  getGeneralOperationalMonthlyStats: new GetGeneralOperationalMonthlyStats(appointmentService),
  getDailyAppointmentStatsLast7Days: new GetDailyAppointmentStatsLast7Days(appointmentService),
  getTopVeterinariansPerformanceByHeadquarter: new GetTopVeterinariansPerformanceByHeadquarter(appointmentService),
  getTopVeterinariansPerformance: new GetTopVeterinariansPerformance(appointmentService)
}
