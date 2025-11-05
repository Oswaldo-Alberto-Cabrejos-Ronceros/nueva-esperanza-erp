import type { PaymentStatsForPanelAdmin } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetCompletedPaymentsStats {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(): Promise<PaymentStatsForPanelAdmin> {
    return await this.paymentService.getCompletedPaymentsStats()
  }
}
