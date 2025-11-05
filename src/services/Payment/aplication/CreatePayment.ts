import type { PaymentService } from '../domain/services/PaymentService'

export class CreatePayment {
  constructor(private readonly paymentService: PaymentService) {}
  async execute(paymentRequest: PaymentRequest) {
    return this.paymentService.createPayment(paymentRequest)
  }
}
