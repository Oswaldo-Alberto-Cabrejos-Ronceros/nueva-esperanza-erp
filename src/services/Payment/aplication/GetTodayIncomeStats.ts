import type { PaymentService } from '@/services/Payment/domain/services/PaymentService'
import type { IncomeStatsToday } from '../domain/models/Payment'

export class GetTodayIncomeStatsUseCase {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(): Promise<IncomeStatsToday> {
    return await this.paymentService.getTodayIncomeStats()
  }
}
