import type { PaymentStatsForPanelAdmin } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetPaymentStatsByHeadquarter {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(headquarterId: number): Promise<PaymentStatsForPanelAdmin> {
    return await this.paymentService.getPaymentsStatsByHeadquarter(headquarterId)
  }
}
