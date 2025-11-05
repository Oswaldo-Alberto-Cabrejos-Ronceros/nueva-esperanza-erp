import type { PaymentMethodService } from '../domain/services/PaymentMethodService'

export class ActivatePaymentMethod {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(id: number): Promise<void> {
    await this.service.activatePaymentMethod(id)
  }
}
