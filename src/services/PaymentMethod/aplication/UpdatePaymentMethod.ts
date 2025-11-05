import type { PaymentMethod, PaymentMethodRequest } from '../domain/models/PaymentMethod';
import type { PaymentMethodService } from '../domain/services/PaymentMethodService';

export class UpdatePaymentMethod {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(id: number, data: PaymentMethodRequest): Promise<PaymentMethod> {
    return await this.service.updatePaymentMethod(id, data);
  }
}
