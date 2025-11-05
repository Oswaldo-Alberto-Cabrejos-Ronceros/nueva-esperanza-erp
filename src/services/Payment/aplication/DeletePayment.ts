import type { PaymentService } from '../domain/services/PaymentService'

export class DeletePayment {
  constructor(private readonly paymentService: PaymentService) {}
  async execute(id: number) {
    return await this.paymentService.deletePayment(id)
  }
}
