import type { PageResponse } from '@/services/models/PageResponse'
import type {
  AnnualRevenue,
  IncomePerHeadquarter,
  IncomeStatsToday,
  MonthlyStats,
  Payment,
  PaymentInfoForAppointment,
  PaymentList,
  PaymentStatsForPanelAdmin,
  RecentPayment,
  WeeklyIncome,
} from '../models/Payment'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export interface PaymentService {
  getAllPayments(): Promise<Payment[]>
  getPaymentById(id: number): Promise<Payment>
  createPayment(paymentRequest: PaymentRequest): Promise<Payment>
  updatePayment(id: number, paymentRequest: PaymentRequest): Promise<Payment>
  deletePayment(id: number): Promise<void>
  getAllPaymentsForTable(
    page: number,
    size: number,
    sort?: string,
  ): Promise<PageResponse<PaymentList>>
  searchPayments(
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
  ): Promise<PageResponse<PaymentList>>
  getCompletedPaymentsStats(): Promise<PaymentStatsForPanelAdmin>
  getPaymentsStatsByHeadquarter(headquarterId: number): Promise<PaymentStatsForPanelAdmin>
  setPaymentStatusComplete(paymentId: number): Promise<void>
  setPaymentStatusCancelled(paymentId: number): Promise<void>
  setPaymentStatusPending(paymentId: number): Promise<void>
  setPaymentStatusRefunded(paymentId: number): Promise<void>
  getTodayIncomeStats(): Promise<IncomeStatsToday>
  getRecentCompletedPayments(headquarterId: number): Promise<RecentPayment[]>
  getWeeklyIncomeGeneral(): Promise<WeeklyIncome>
  getWeeklyIncomeByHeadquarter(headquarterId: number): Promise<WeeklyIncome>
  getPaymentInfoByCareId(careId: number): Promise<PaymentInfoForAppointment>
  getIncomePerHeadquarterByPeriod(period: ReportPeriod): Promise<IncomePerHeadquarter>
  getAnnualFinancialEvolutionByHeadquarter(headquarterId: number): Promise<AnnualRevenue>
  getAnnualFinancialEvolution(): Promise<AnnualRevenue>
  getAnnualFinancialEvolutionByHeadquarter(headquarterId: number): Promise<AnnualRevenue>
  getGeneralMonthlyStats(): Promise<MonthlyStats>
  getMonthlyStatsByHeadquarter(headquarterId: number): Promise<MonthlyStats>
}
