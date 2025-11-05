import { useAsyncHandler } from './useAsyncHandler'
import type { Appointment as AppointmentView } from '@/models/Appointment'
import { appointmentUsesCases } from '@/dependency-injection/appointment.container'
import { AppointmentAdapter } from '@/adapters/AppointmentAdapter'
import type {
  AppointmentRequest,
  AppointmentStatsForReceptionist,
} from '@/services/Appointment/domain/models/Appointment'
import type { TimesForTurn as TimesForTurnView } from '@/models/TimesForTurn'
import { TimesForTurnAdapter } from '@/adapters/TimesForTurnAdapter'
import type { BasicServiceForAppointment as BasicServiceForAppointmentView } from '@/models/BasicServiceForAppointment'
import { BasicServiceForAppointmentAdapter } from '@/adapters/BasicServiceForAppoinment'
import { DateAdapter } from '@/adapters/DateAdapter'
import type { AppointmentRequest as AppointmentRequestView } from '@/models/AppointmentRequest'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchAppointmentParams } from '@/services/Appointment/domain/models/SearchAppointmentParams'
import type { AppointmentList as AppointmentListView } from '@/models/AppointmentList'
import type { InfoAppointmentForPanel as InfoAppointmentForPanelView } from '@/models/InfoAppointmentForPanel'
import type { PetInfoForAppointment as PetInfoForAppointmentView } from '@/models/PetInfoForAppointment'
import type { ClientInfoForAppointment as ClientInfoForAppointmentView } from '@/models/ClientInfoForAppointment'
import type { PaymentInfoForAppointment as PaymentInfoForAppointmentView } from '@/models/PaymentInfoForAppointment'
import type { AppointmentInfoPanelAdmin as AppointmentInfoPanelAdminView } from '@/models/AppointmentInfoPanelAdmin'
import type { CareAndAppointmentPanelEmployee as CareAndAppointmentPanelEmployeeView } from '@/models/CareAndAppointmentPanelEmployee'
import { PaymentAdapter } from '@/adapters/PaymentAdapter'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export function useAppointment() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use casos

  const completeAppointment = async (appointmentId: number): Promise<AppointmentView> => {
    const appointment = await runUseCase('completeAppointment', () =>
      appointmentUsesCases.completeAppointment.execute(appointmentId),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const confirmAppointment = async (appointmentId: number): Promise<AppointmentView> => {
    const appointment = await runUseCase('confirmAppointment', () =>
      appointmentUsesCases.confirmAppointment.execute(appointmentId),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const createAppointment = async (
    appointmentRequestView: AppointmentRequestView,
  ): Promise<AppointmentView> => {
    const appointmentRequest: AppointmentRequest =
      AppointmentAdapter.fromAppoinmentRequestViewToAppoinmentRequest(appointmentRequestView)
    const appointment = await runUseCase('createAppointment', () =>
      appointmentUsesCases.createAppointment.execute(appointmentRequest),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const deleteAppointment = async (appointmentId: number) => {
    await runUseCase('deleteAppointment', () =>
      appointmentUsesCases.deleteAppointment.execute(appointmentId),
    )
  }

  const getAllAppointments = async (): Promise<AppointmentView[]> => {
    const appointments = await runUseCase('getAllAppointments', () =>
      appointmentUsesCases.getAllAppointments.execute(),
    )
    return appointments.map((appointment) => AppointmentAdapter.toAppointmentView(appointment))
  }
  const getAvailableTimes = async (
    headquarterVetServiceId: number,
    date: Date,
  ): Promise<TimesForTurnView[]> => {
    const dateParsed = DateAdapter.toDateYYYYmmDD(date)
    const times = await runUseCase('getAvailableTimes', () =>
      appointmentUsesCases.getAvailableTimes.execute(headquarterVetServiceId, dateParsed),
    )
    console.log(times)
    return times.map((time) => TimesForTurnAdapter.toTimesForTurnView(time))
  }

  const getServicesByHeadquarterAndSpecies = async (
    headquarterId: number,
    speciesId: number,
  ): Promise<BasicServiceForAppointmentView[]> => {
    let services = await runUseCase('getServicesByHeadquarterAndSpecies', () =>
      appointmentUsesCases.getServicesByHeadquarterAndSpecies.execute(headquarterId, speciesId),
    )
    if (!services) {
      services = []
    }
    return services.map((service) =>
      BasicServiceForAppointmentAdapter.toBasicServiceForAppointmentView(service),
    )
  }

  const updateAppointment = async (
    appointmentId: number,
    appointmentRequest: AppointmentRequest,
  ): Promise<AppointmentView> => {
    const appointment = await runUseCase('updateAppointment', () =>
      appointmentUsesCases.updateAppointment.execute(appointmentId, appointmentRequest),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const getAppointmentsForClient = async (
    clientId: number,
  ): Promise<InfoBasicAppointmentClient[]> => {
    const appointments = await runUseCase('getAppointmentsForClient', () =>
      appointmentUsesCases.getAppointmentsForClient.execute(clientId),
    )
    return appointments.map((appointment) =>
      AppointmentAdapter.fromInfoBasicAppointmentToInfoBasicAppointmentInfoClient(appointment),
    )
  }
  const searchAppointments = async (
    params: SearchAppointmentParams,
  ): Promise<PageResponse<AppointmentListView>> => {
    const page = await runUseCase('searchAppointments', () =>
      appointmentUsesCases.searchAppointment.execute(params),
    )
    return {
      ...page,
      content: page.content.map((appointment) =>
        AppointmentAdapter.fromAppointementListToAppointmentListView(appointment),
      ),
    }
  }

  const getAppointmentById = async (appointmentId: number): Promise<AppointmentView> => {
    const appointment = await runUseCase('getAppointmentById', () =>
      appointmentUsesCases.getAppointmentById.execute(appointmentId),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const getAppointmentPanelInfo = async (
    appointmentId: number,
  ): Promise<InfoAppointmentForPanelView> => {
    const infoAppointment = await runUseCase('getAppointmentPanelInfo', () =>
      appointmentUsesCases.getAppointmentPanelInfo.execute(appointmentId),
    )
    return AppointmentAdapter.toInfoAppointmentForPanel(infoAppointment)
  }

  const getPetInfoForAppointment = async (
    appointmentId: number,
  ): Promise<PetInfoForAppointmentView> => {
    const petInfoAppointment = await runUseCase('getPetInfoForAppointment', () =>
      appointmentUsesCases.getAnimalInfoForAppointment.execute(appointmentId),
    )
    return AppointmentAdapter.toPetInfoAppointmentView(petInfoAppointment)
  }

  const getClientInfoForAppointment = async (
    appoinmentId: number,
  ): Promise<ClientInfoForAppointmentView> => {
    const clientInfoAppointment = await runUseCase('getClientInfoForAppointment', () =>
      appointmentUsesCases.getClientInfoForAppointment.execute(appoinmentId),
    )
    return AppointmentAdapter.toClientInfoForAppointmentView(clientInfoAppointment)
  }

  const getPaymentInfoForAppointment = async (
    appoinmentId: number,
  ): Promise<PaymentInfoForAppointmentView> => {
    const paymentInfoAppoinment = await runUseCase('getPaymentInfoForAppointment', () =>
      appointmentUsesCases.getPaymentInfoForAppointment.execute(appoinmentId),
    )
    return PaymentAdapter.toPaymentInfoForAppointmentView(paymentInfoAppoinment)
  }

  const getTodayAppointmentStats = async () => {
    const todayStats = await runUseCase('getTodayAppointmentStats', () =>
      appointmentUsesCases.getTodayAppointmentStats.execute(),
    )
    return todayStats
  }

  const getTodayAppointmentStatsByHeadquarter = async (headquarterId: number) => {
    const stats = await runUseCase('getTodayAppointmentStatsByHeadquarter', () =>
      appointmentUsesCases.getTodayAppointmentStatsByHeadquarter.execute(headquarterId),
    )
    return stats
  }

  const getAppointmentsByDateForPanelAdmin = async (): Promise<AppointmentInfoPanelAdminView[]> => {
    const appointments = await runUseCase('getAppointmentsByDateForPanelAdmin', () =>
      appointmentUsesCases.getAppointmentsByDateForPanelAdmin.execute(),
    )
    return appointments.map((ap) => AppointmentAdapter.toAppointmentInfoPanelAdminView(ap))
  }

  const getAppointmentsByDateForPanelManager = async (
    headquarterId: number,
  ): Promise<AppointmentInfoPanelAdminView[]> => {
    const appointments = await runUseCase('getAppointmentsByDateForPanelManager', () =>
      appointmentUsesCases.getAppointmentsByDateForPanelManager.execute(headquarterId),
    )
    return appointments.map((ap) => AppointmentAdapter.toAppointmentInfoPanelAdminView(ap))
  }

  const getCareAndAppointmentsForEmployee = async (
    employeeId: number,
  ): Promise<CareAndAppointmentPanelEmployeeView[]> => {
    const appoinments = await runUseCase('getCareAndAppointmentsForEmployee', () =>
      appointmentUsesCases.getCareAndAppointmentsForEmployeeUseCase.execute(employeeId),
    )
    return appoinments.map((ap) => AppointmentAdapter.toCareAndAppointmentPanelEmployeeView(ap))
  }

  const getStatsForReceptionist = async (
    headquarterId: number,
  ): Promise<AppointmentStatsForReceptionist> => {
    return await runUseCase('getStatsForReceptionist', () =>
      appointmentUsesCases.getStatsForReceptionist.execute(headquarterId),
    )
  }

  const getAppointmentsByHeadquarterId = async (
    headquarterId: number,
  ): Promise<CareAndAppointmentPanelEmployeeView[]> => {
    const appointments = await runUseCase('getAppointmentsByHeadquarterId', () =>
      appointmentUsesCases.getAppointmentsByHeadquarterId.execute(headquarterId),
    )
    return appointments.map((ap) => AppointmentAdapter.toCareAndAppointmentPanelEmployeeView(ap))
  }

  const getOperationalMonthlyStatsByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getOperationalMonthlyStatsByHeadquarter', () =>
      appointmentUsesCases.getOperationalMonthlyStatsByHeadquarter.execute(headquarterId),
    )
  }

  const getDailyAppointmentStatsByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getDailyAppointmentStatsByHeadquarter', () =>
      appointmentUsesCases.getDailyAppointmentStatsByHeadquarter.execute(headquarterId),
    )
  }

  const getGeneralOperationalMonthlyStats = async () => {
    return await runUseCase('getDailyAppointmentStatsByHeadquarter', () =>
      appointmentUsesCases.getGeneralOperationalMonthlyStats.execute(),
    )
  }

  const getDailyAppointmentStatsLast7Days = async () => {
    return await runUseCase('getDailyAppointmentStatsLast7Days', () =>
      appointmentUsesCases.getDailyAppointmentStatsLast7Days.execute(),
    )
  }

  const getTopVeterinariansPerformance = async (period: ReportPeriod) => {
    return await runUseCase('getTopVeterinariansPerformance', () =>
      appointmentUsesCases.getTopVeterinariansPerformance.execute(period),
    )
  }

  const getTopVeterinariansPerformanceByHeadquarter = async (
    period: ReportPeriod,
    headquarterId: number,
  ) => {
    return await runUseCase('getTopVeterinariansPerformanceByHeadquarter', () =>
      appointmentUsesCases.getTopVeterinariansPerformanceByHeadquarter.execute(
        period,
        headquarterId,
      ),
    )
  }

  return {
    loading,
    error,
    completeAppointment,
    createAppointment,
    confirmAppointment,
    deleteAppointment,
    getAllAppointments,
    getAvailableTimes,
    getServicesByHeadquarterAndSpecies,
    updateAppointment,
    getAppointmentsForClient,
    getAppointmentById,
    searchAppointments,
    getAppointmentPanelInfo,
    getPetInfoForAppointment,
    getClientInfoForAppointment,
    getPaymentInfoForAppointment,
    getTodayAppointmentStats,
    getTodayAppointmentStatsByHeadquarter,
    getAppointmentsByDateForPanelManager,
    getAppointmentsByDateForPanelAdmin,
    getCareAndAppointmentsForEmployee,
    getStatsForReceptionist,
    getAppointmentsByHeadquarterId,
    getOperationalMonthlyStatsByHeadquarter,
    getDailyAppointmentStatsByHeadquarter,
    getGeneralOperationalMonthlyStats,
    getDailyAppointmentStatsLast7Days,
    getTopVeterinariansPerformance,
    getTopVeterinariansPerformanceByHeadquarter,
  }
}
