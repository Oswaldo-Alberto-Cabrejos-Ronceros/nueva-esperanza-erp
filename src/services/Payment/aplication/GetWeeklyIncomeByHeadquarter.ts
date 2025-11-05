import type { PaymentService } from '@/services/Payment/domain/services/PaymentService'
import type { WeeklyIncome } from '../domain/models/Payment'

export class GetWeeklyIncomeByHeadquarter {
  constructor(private readonly paymentService: PaymentService) {}

  execute(headquarterId: number): Promise<WeeklyIncome> {
    return this.paymentService.getWeeklyIncomeByHeadquarter(headquarterId)
  }
}
