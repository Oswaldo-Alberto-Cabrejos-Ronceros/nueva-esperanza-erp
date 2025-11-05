import type { PaymentService } from '../domain/services/PaymentService'

export class UpdatePayment {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(id: number, paymentRequest: PaymentRequest) {
    return this.paymentService.updatePayment(id, paymentRequest)
  }
}
