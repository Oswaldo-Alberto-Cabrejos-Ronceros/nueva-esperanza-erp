import type { MonthlyStats } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetGeneralMonthlyStats {
  constructor(private readonly service: PaymentService) {}
  execute(): Promise<MonthlyStats> {
    return this.service.getGeneralMonthlyStats()
  }
}
