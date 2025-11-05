import type { MonthlyStats } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetMonthlyStatsByHeadquarter {
  constructor(private readonly service: PaymentService) {}
  execute(headquarterId: number): Promise<MonthlyStats> {
    return this.service.getMonthlyStatsByHeadquarter(headquarterId)
  }
}
