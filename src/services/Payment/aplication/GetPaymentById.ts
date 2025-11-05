import type { PaymentService } from '../domain/services/PaymentService'

export class GetPaymentById {
  constructor(private readonly paymentService: PaymentService) {}
  async execute(id: number) {
    return this.paymentService.getPaymentById(id)
  }
}
