import { useAsyncHandler } from './useAsyncHandler'
import type { Payment as PaymentView } from '@/models/Payment'
import type { PaymentList as PaymentListView } from '@/models/PaymentList'
import { PaymentAdapter } from '@/adapters/PaymentAdapter'
import { paymentUsesCases } from '@/dependency-injection/payment.container'
import type { PageResponse } from '@/services/models/PageResponse'
import type { IncomeStatsToday, WeeklyIncome } from '@/services/Payment/domain/models/Payment'
import type { RecentPayment as RecentPaymentView } from '@/models/RecientPayment'
import type { PaymentInfoForAppointment as PaymentInfoForAppointmentView } from '@/models/PaymentInfoForAppointment'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'
export function usePayment() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAllPayments = async (): Promise<PaymentView[]> => {
    const payments = await runUseCase('getAllPayments', () =>
      paymentUsesCases.getAllPayments.execute(),
    )
    return payments.map((payment) => PaymentAdapter.toPaymentView(payment))
  }

  const getPaymentById = async (id: number): Promise<PaymentView> => {
    const payment = await runUseCase('getPaymentById', () =>
      paymentUsesCases.getPaymentById.execute(id),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const createPayment = async (paymentRequest: PaymentRequest): Promise<PaymentView> => {
    const payment = await runUseCase('createPayment', () =>
      paymentUsesCases.createPayment.execute(paymentRequest),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const updatePayment = async (
    id: number,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentView> => {
    const payment = await runUseCase('updatePayment', () =>
      paymentUsesCases.updatePayment.execute(id, paymentRequest),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const deletePayment = async (id: number): Promise<void> => {
    await runUseCase('deletePayment', () => paymentUsesCases.deletePayment.execute(id))
  }

  const getAllPaymentsForTable = async (
    page: number,
    size: number,
    sort?: string,
  ): Promise<PaymentListView[]> => {
    const paymentsPage = await runUseCase('getAllPaymentsForTable', () =>
      paymentUsesCases.getAllPaymentsForTable.execute(page, size, sort),
    )
    return paymentsPage.content.map((payment) =>
      PaymentAdapter.fromPaymentListToPaymentListView(payment),
    )
  }

  const searchPayments = async (
    page: number,
    size: number,
    options: {
      dni?: string
      headquarterId?: number
      serviceId?: number
      status?: string
      startDate?: string
      endDate?: string
    },
    sort?: string,
  ): Promise<PageResponse<PaymentListView>> => {
    const paymentsPage = await runUseCase('searchPayments', () =>
      paymentUsesCases.searchPayments.execute(page, size, options, sort),
    )
    const payments = paymentsPage.content.map((payment) =>
      PaymentAdapter.fromPaymentListToPaymentListView(payment),
    )
    return {
      ...paymentsPage,
      content: payments,
    }
  }

  const getPaymentStatsByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getPaymentStatsByHeadquarter', () =>
      paymentUsesCases.getPaymentStatsByHeadquarter.execute(headquarterId),
    )
  }

  const getCompletedPaymentsStats = async () => {
    return await runUseCase('getCompletedPaymentsStats', () =>
      paymentUsesCases.getCompletedPaymentsStats.execute(),
    )
  }

  const setPaymentStatusComplete = async (paymentId: number): Promise<void> => {
    await runUseCase('setPaymentStatusComplete', () =>
      paymentUsesCases.setPaymentStatusComplete.execute(paymentId),
    )
  }

  const setPaymentStatusCancelled = async (paymentId: number): Promise<void> => {
    await runUseCase('setPaymentStatusCancelled', () =>
      paymentUsesCases.setPaymentStatusCancelled.execute(paymentId),
    )
  }

  const setPaymentStatusPending = async (paymentId: number): Promise<void> => {
    await runUseCase('setPaymentStatusPending', () =>
      paymentUsesCases.setPaymentStatusPending.execute(paymentId),
    )
  }

  const setPaymentStatusRefunded = async (paymentId: number): Promise<void> => {
    await runUseCase('setPaymentStatusRefunded', () =>
      paymentUsesCases.setPaymentStatusRefunded.execute(paymentId),
    )
  }

  //recepcionist

  const getTodayIncomeStats = async (): Promise<IncomeStatsToday> => {
    return await runUseCase('getTodayIncomeStats', () =>
      paymentUsesCases.getTodayIncomeStats.execute(),
    )
  }
  const getRecentCompletedPayments = async (
    headquarterId: number,
  ): Promise<RecentPaymentView[]> => {
    const payments = await runUseCase('getRecentCompletedPayments', () =>
      paymentUsesCases.getRecentCompletedPayments.execute(headquarterId),
    )
    return payments.map((payment) => PaymentAdapter.toRecentPaymentView(payment))
  }

  const getWeeklyIncomeGeneral = async (): Promise<WeeklyIncome> => {
    return await runUseCase('getWeeklyIncomeGeneral', () =>
      paymentUsesCases.getWeeklyIncomeGeneral.execute(),
    )
  }

  const getWeeklyIncomeByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getWeeklyIncomeByHeadquarter', () =>
      paymentUsesCases.getWeeklyIncomeByHeadquarter.execute(headquarterId),
    )
  }

  const getPaymentInfoByCareId = async (careId: number): Promise<PaymentInfoForAppointmentView> => {
    const paymentInf = await runUseCase('getPaymentInfoByCareId', () =>
      paymentUsesCases.getPaymentInfoByCareId.execute(careId),
    )
    return PaymentAdapter.toPaymentInfoForAppointmentView(paymentInf)
  }

  const getIncomePerHeadquarterByPeriod = async (period: ReportPeriod) => {
    return await runUseCase('getIncomePerHeadquarterByPeriod', () =>
      paymentUsesCases.getIncomePerHeadquarterByPeriod.execute(period),
    )
  }

  const getAnnualFinancialEvolutionByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getAnnualFinancialEvolutionByHeadquarter', () =>
      paymentUsesCases.getAnnualFinancialEvolutionByHeadquarter.execute(headquarterId),
    )
  }

  const getAnnualFinancialEvolution = async () => {
    return await runUseCase('getAnnualFinancialEvolution', () =>
      paymentUsesCases.getAnnualFinancialEvolution.execute(),
    )
  }

  const getGeneralMonthlyStats = async () => {
    return await runUseCase('getGeneralMonthlyStats', () =>
      paymentUsesCases.getGeneralMonthlyStats.execute(),
    )
  }

  const getMonthlyStatsByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getMonthlyStatsByHeadquarter', () =>
      paymentUsesCases.getMonthlyStatsByHeadquarter.execute(headquarterId),
    )
  }

  return {
    loading,
    error,
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    getAllPaymentsForTable,
    searchPayments,
    getPaymentStatsByHeadquarter,
    getCompletedPaymentsStats,
    setPaymentStatusComplete,
    setPaymentStatusCancelled,
    setPaymentStatusPending,
    setPaymentStatusRefunded,
    getTodayIncomeStats,
    getRecentCompletedPayments,
    getWeeklyIncomeGeneral,
    getWeeklyIncomeByHeadquarter,
    getPaymentInfoByCareId,
    getIncomePerHeadquarterByPeriod,
    getAnnualFinancialEvolutionByHeadquarter,
    getAnnualFinancialEvolution,
    getGeneralMonthlyStats,
    getMonthlyStatsByHeadquarter,
  }
}
