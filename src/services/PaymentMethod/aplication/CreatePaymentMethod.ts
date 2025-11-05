import type { PaymentMethod, PaymentMethodRequest } from '../domain/models/PaymentMethod';
import type { PaymentMethodService } from '../domain/services/PaymentMethodService';

export class CreatePaymentMethod {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(data: PaymentMethodRequest): Promise<PaymentMethod> {
    return await this.service.createPaymentMethod(data);
  }
}
