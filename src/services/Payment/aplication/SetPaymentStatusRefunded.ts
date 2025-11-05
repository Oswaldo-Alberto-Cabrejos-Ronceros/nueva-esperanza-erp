import type { PaymentService } from "../domain/services/PaymentService";

export class SetPaymentStatusRefunded {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(paymentId: number): Promise<void> {
    await this.paymentService.setPaymentStatusRefunded(paymentId)
  }
}
