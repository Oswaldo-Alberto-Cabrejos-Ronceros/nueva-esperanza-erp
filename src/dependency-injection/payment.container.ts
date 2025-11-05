import { GetAllPayments } from '@/services/Payment/aplication/GetAllPayments'
import { GetPaymentById } from '@/services/Payment/aplication/GetPaymentById'
import { CreatePayment } from '@/services/Payment/aplication/CreatePayment'
import { UpdatePayment } from '@/services/Payment/aplication/UpdatePayment'
import { DeletePayment } from '@/services/Payment/aplication/DeletePayment'
import { GetAllPaymentsForTable } from '@/services/Payment/aplication/GetAllPaymentsForTable'
import { SearchPayments } from '@/services/Payment/aplication/SearchPayments'
import { GetPaymentStatsByHeadquarter } from '@/services/Payment/aplication/GetPaymentStatsByHeadquarter '
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { PaymentServiceImpl } from '@/services/Payment/infrastructure/PaymentServiceImpl'
import { GetCompletedPaymentsStats } from '@/services/Payment/aplication/GetCompletedPaymentsStats '
import { SetPaymentStatusCancelled } from '@/services/Payment/aplication/SetPaymentStatusCancelled'
import { SetPaymentStatusPending } from '@/services/Payment/aplication/SetPaymentStatusPending'
import { SetPaymentStatusRefunded } from '@/services/Payment/aplication/SetPaymentStatusRefunded'
import { SetPaymentStatusComplete } from '@/services/Payment/aplication/SetPaymentStatusComplete'
import { GetTodayIncomeStatsUseCase } from '@/services/Payment/aplication/GetTodayIncomeStats'
import { GetRecentCompletedPaymentsUseCase } from '@/services/Payment/aplication/GetRecentCompletedPayments'
import { GetWeeklyIncomeGeneral } from '@/services/Payment/aplication/GetWeeklyIncomeGeneral'
import { GetWeeklyIncomeByHeadquarter } from '@/services/Payment/aplication/GetWeeklyIncomeByHeadquarter'
import { GetPaymentInfoByCareId } from '@/services/Payment/aplication/GetPaymentInfoByCareId'
import { GetIncomePerHeadquarterByPeriod } from '@/services/Payment/aplication/GetIncomePerHeadquarterByPeriod'
import { GetAnnualFinancialEvolutionByHeadquarter } from '@/services/Payment/aplication/GetAnnualFinancialEvolutionByHeadquarter'
import { GetAnnualFinancialEvolution } from '@/services/Payment/aplication/GetAnnualFinancialEvolution'
import { GetGeneralMonthlyStats } from '@/services/Payment/aplication/GetGeneralMonthlyStats'
import { GetMonthlyStatsByHeadquarter } from '@/services/Payment/aplication/GetMonthlyStatsByHeadquarter'

// Instancia del cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia de la implementación del servicio de pagos
const paymentService = new PaymentServiceImpl(axiosHttpClient)

// Exposición de todos los casos de uso con la dependencia inyectada
export const paymentUsesCases = {
  getAllPayments: new GetAllPayments(paymentService),
  getPaymentById: new GetPaymentById(paymentService),
  createPayment: new CreatePayment(paymentService),
  updatePayment: new UpdatePayment(paymentService),
  deletePayment: new DeletePayment(paymentService),
  getAllPaymentsForTable: new GetAllPaymentsForTable(paymentService),
  searchPayments: new SearchPayments(paymentService),
  getPaymentStatsByHeadquarter: new GetPaymentStatsByHeadquarter(paymentService),
  getCompletedPaymentsStats: new GetCompletedPaymentsStats(paymentService),
  setPaymentStatusComplete: new SetPaymentStatusComplete(paymentService),
  setPaymentStatusCancelled: new SetPaymentStatusCancelled(paymentService),
  setPaymentStatusPending: new SetPaymentStatusPending(paymentService),
  setPaymentStatusRefunded: new SetPaymentStatusRefunded(paymentService),
  getTodayIncomeStats: new GetTodayIncomeStatsUseCase(paymentService),
  getRecentCompletedPayments: new GetRecentCompletedPaymentsUseCase(paymentService),
  getWeeklyIncomeGeneral: new GetWeeklyIncomeGeneral(paymentService),
  getWeeklyIncomeByHeadquarter: new GetWeeklyIncomeByHeadquarter(paymentService),
  getPaymentInfoByCareId: new GetPaymentInfoByCareId(paymentService),
  getIncomePerHeadquarterByPeriod: new GetIncomePerHeadquarterByPeriod(paymentService),
  getAnnualFinancialEvolutionByHeadquarter: new GetAnnualFinancialEvolutionByHeadquarter(
    paymentService,
  ),

  getAnnualFinancialEvolution: new GetAnnualFinancialEvolution(paymentService),
  getGeneralMonthlyStats: new GetGeneralMonthlyStats(paymentService),
  getMonthlyStatsByHeadquarter: new GetMonthlyStatsByHeadquarter(paymentService),
}
