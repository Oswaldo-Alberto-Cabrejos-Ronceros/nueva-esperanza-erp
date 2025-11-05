import { careUsesCases } from '@/dependency-injection/care.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Care as CareView } from '@/models/Care'
import { CareAdapter } from '@/adapters/CareAdapter'
import type { CareRequest, CareStatsToday } from '@/services/Care/domain/models/Care'
import type { FormValues as AddCareFromAppoinmentSchema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'
import type { PageResponse } from '@/services/models/PageResponse'
import type { CareAndAppointmentPanelEmployee as CareAndAppointmentPanelEmployeeView } from '@/models/CareAndAppointmentPanelEmployee'
import { AppointmentAdapter } from '@/adapters/AppointmentAdapter'
import type { CareList as CareListView } from '@/models/CareList'
import type { RecentPatient as RecentPatientView } from '@/models/RecentPatient'
import { AnimalAdapter } from '@/adapters/AnimalAdapter'

export function useCare() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAllCares = async (): Promise<CareView[]> => {
    const cares = await runUseCase('getAllCares', () => careUsesCases.getAllCares.execute())
    return cares.map((care) => CareAdapter.toView(care))
  }

  const getCareById = async (id: number): Promise<CareView> => {
    const care = await runUseCase('getCareById', () => careUsesCases.getCareById.execute(id))
    return CareAdapter.toView(care)
  }

  const getCareByAppointment = async (id: number): Promise<CareView[]> => {
    const cares = await runUseCase('getCareByAppointment', () =>
      careUsesCases.getCareByAppointment.execute(id),
    )
    return cares.map((care) => CareAdapter.toView(care))
  }

  const createCare = async (careRequest: CareRequest): Promise<CareView> => {
    const care = await runUseCase('createCare', () => careUsesCases.createCare.execute(careRequest))
    return CareAdapter.toView(care)
  }

  const completeCare = async (id: number): Promise<CareView> => {
    const care = await runUseCase('completeCare', () => careUsesCases.completeCare.execute(id))
    return CareAdapter.toView(care)
  }

  const updateCare = async (id: number, careRequest: CareRequest): Promise<CareView> => {
    const care = await runUseCase('updateCare', () =>
      careUsesCases.updateCare.execute(id, careRequest),
    )
    return CareAdapter.toView(care)
  }

  const createCareFromAppointment = async (
    schema: AddCareFromAppoinmentSchema,
  ): Promise<CareView> => {
    const careRequest = CareAdapter.fromSchemaToCreateCareFromAppointmentRequest(schema)
    const care = await runUseCase('createCareFromAppointment', () =>
      careUsesCases.createCareFromAppointment.execute(careRequest),
    )
    return CareAdapter.toView(care)
  }

  const createCareFromRequest = async (schema: AddCareFromRequestSchema): Promise<CareView> => {
    const careRequest = CareAdapter.fromSchemaToCareRequestCreate(schema)
    const care = await runUseCase('createCareFromRequest', () =>
      careUsesCases.createCareFromRequest.execute(careRequest),
    )
    return CareAdapter.toView(care)
  }

  const searchCares = async (
    status?: string,
    fecha?: string,
    idHeadquarter?: number,
    idService?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<CareListView>> => {
    const result = await runUseCase('searchCares', () =>
      careUsesCases.searchCares.execute(status, fecha, idHeadquarter, idService, page, size),
    )

    const content = result.content.map((care) => CareAdapter.fromCareListToCareListView(care))

    return {
      ...result,
      content,
    }
  }

  const getCareStatsToday = async (headquarterId:number): Promise<CareStatsToday> => {
    return await runUseCase('getCareStatsToday', () => careUsesCases.getCareStatsToday.execute(headquarterId))
  }

  const getCaresForEmployee = async (
    employeeId: number,
  ): Promise<CareAndAppointmentPanelEmployeeView[]> => {
    const cares = await runUseCase('getCaresForEmployee', () =>
      careUsesCases.getCaresForEmployee.execute(employeeId),
    )
    return cares.map((c) => AppointmentAdapter.toCareAndAppointmentPanelEmployeeView(c))
  }

  const getCaresByHeadquarterId = async (
    headquarterId: number,
  ): Promise<CareAndAppointmentPanelEmployeeView[]> => {
    const cares = await runUseCase('getCaresByHeadquarterId', () =>
      careUsesCases.getCaresByHeadquarterId.execute(headquarterId),
    )
    return cares.map((c) => AppointmentAdapter.toCareAndAppointmentPanelEmployeeView(c))
  }

  const setOnGoingCare = async (id: number): Promise<CareView> => {
    const care = await runUseCase('setOnGoingCare', () => careUsesCases.setOnGoingCare.execute(id))
    return CareAdapter.toView(care)
  }

  const getRecentPatientsByEmployee = async (employeeId: number): Promise<RecentPatientView[]> => {
    const patients = await runUseCase('getRecentPatientsByEmployee', () =>
      careUsesCases.getRecentPatientsByEmployee.execute(employeeId),
    )
    return patients.map((p) => AnimalAdapter.toRecentPatientView(p))
  }

const getMonthlyPerformanceStatsByVeterinary = async (employeeId: number) => {
  return await runUseCase('getMonthlyPerformanceStatsByVeterinary', () =>
    careUsesCases.getMonthlyPerformanceStatsByVeterinary.execute(employeeId),
  )
}

const getWeeklyPerformanceGraphicByVeterinary = async (employeeId: number) => {
  return await runUseCase('getWeeklyPerformanceGraphicByVeterinary', () =>
    careUsesCases.getWeeklyPerformanceGraphicByVeterinary.execute(employeeId),
  )
}


  return {
    loading,
    error,
    getAllCares,
    getCareById,
    getCareByAppointment,
    createCare,
    completeCare,
    updateCare,
    createCareFromAppointment,
    createCareFromRequest,
    searchCares,
    getCareStatsToday,
    getCaresForEmployee,
    getCaresByHeadquarterId,
    setOnGoingCare,
    getRecentPatientsByEmployee,
    getMonthlyPerformanceStatsByVeterinary,
    getWeeklyPerformanceGraphicByVeterinary,

  }
}
