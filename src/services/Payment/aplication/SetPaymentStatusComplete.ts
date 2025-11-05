import type { PaymentService } from "../domain/services/PaymentService";

export class SetPaymentStatusComplete {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(paymentId: number): Promise<void> {
    await this.paymentService.setPaymentStatusComplete(paymentId)
  }
}
