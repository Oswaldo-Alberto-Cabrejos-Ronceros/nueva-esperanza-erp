import type { PaymentService } from '@/services/Payment/domain/services/PaymentService'
import type { RecentPayment } from '../domain/models/Payment'

export class GetRecentCompletedPaymentsUseCase {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(headquarterId: number): Promise<RecentPayment[]> {
    return await this.paymentService.getRecentCompletedPayments(headquarterId)
  }
}
