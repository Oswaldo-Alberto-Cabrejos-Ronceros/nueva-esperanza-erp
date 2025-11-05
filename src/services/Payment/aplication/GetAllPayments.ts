import type { PaymentService } from '../domain/services/PaymentService'

export class GetAllPayments {
  constructor(private readonly paymentService: PaymentService) {}

  async execute() {
    return this.paymentService.getAllPayments()
  }
}
