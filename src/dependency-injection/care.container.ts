import { GetAllCares } from '@/services/Care/aplication/GetAllCares'
import { GetCareById } from '@/services/Care/aplication/GetCareById'
import { GetCareByAppointment } from '@/services/Care/aplication/GetCareByAppointment'
import { CreateCare } from '@/services/Care/aplication/CreateCare'
import { CompleteCare } from '@/services/Care/aplication/CompleteCare'
import { UpdateCare } from '@/services/Care/aplication/UpdateCare'
import { CreateCareFromAppointment } from '@/services/Care/aplication/CreateCareFromAppointment'
import { CreateCareFromRequest } from '@/services/Care/aplication/CreateCareFromRequest'
import { SearchCares } from '@/services/Care/aplication/SearchCares'
import { CareServiceImpl } from '@/services/Care/infrastructure/CardServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { GetCaresForEmployee } from '@/services/Care/aplication/GetCaresForEmployee'
import { GetCareStatsToday } from '@/services/Care/aplication/GetCareStatsToday'
import { GetCaresByHeadquarterId } from '@/services/Care/aplication/GetCaresByHeadquarterId'
import { SetOnGoingCare } from '@/services/Care/aplication/SetOnGoingCare'
import { GetRecentPatientsByEmployee } from '@/services/Care/aplication/GetRecentPatientsByEmployee'
import { GetMonthlyPerformanceStatsByVeterinary } from '@/services/Care/aplication/GetMonthlyPerformanceStatsByVeterinary'
import { GetWeeklyPerformanceGraphicByVeterinary } from '@/services/Care/aplication/GetWeeklyPerformanceGraphicByVeterinary'

// Instancia del cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia del servicio concreto de Care
const careService = new CareServiceImpl(axiosHttpClient)

// Exporta todos los casos de uso con la dependencia inyectada
export const careUsesCases = {
  getAllCares: new GetAllCares(careService),
  getCareById: new GetCareById(careService),
  getCareByAppointment: new GetCareByAppointment(careService),
  createCare: new CreateCare(careService),
  completeCare: new CompleteCare(careService),
  updateCare: new UpdateCare(careService),
  createCareFromAppointment: new CreateCareFromAppointment(careService),
  createCareFromRequest: new CreateCareFromRequest(careService),
  searchCares: new SearchCares(careService),
  getCaresForEmployee: new GetCaresForEmployee(careService),
  getCareStatsToday: new GetCareStatsToday(careService),
  getCaresByHeadquarterId: new GetCaresByHeadquarterId(careService),
  setOnGoingCare: new SetOnGoingCare(careService),
  getRecentPatientsByEmployee: new GetRecentPatientsByEmployee(careService),
  getMonthlyPerformanceStatsByVeterinary: new GetMonthlyPerformanceStatsByVeterinary(careService),
  getWeeklyPerformanceGraphicByVeterinary: new GetWeeklyPerformanceGraphicByVeterinary(careService),

}
