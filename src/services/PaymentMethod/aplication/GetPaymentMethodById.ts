import type { PaymentMethod } from '../domain/models/PaymentMethod';
import type { PaymentMethodService } from '../domain/services/PaymentMethodService';

export class GetPaymentMethodById {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(id: number): Promise<PaymentMethod> {
    return await this.service.getPaymentMethodById(id);
  }
}
