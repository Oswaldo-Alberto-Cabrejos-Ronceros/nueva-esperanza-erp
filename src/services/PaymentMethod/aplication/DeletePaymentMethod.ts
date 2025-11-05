import type { PaymentMethodService } from '../domain/services/PaymentMethodService';

export class DeletePaymentMethod {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(id: number): Promise<void> {
    await this.service.deletePaymentMethod(id);
  }
}
