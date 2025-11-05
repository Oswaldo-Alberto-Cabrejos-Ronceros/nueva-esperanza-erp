import type { PaymentMethod } from '../domain/models/PaymentMethod';
import type { PaymentMethodService } from '../domain/services/PaymentMethodService';

export class GetAllPaymentMethods {
  constructor(private readonly service: PaymentMethodService) {}

  async execute(): Promise<PaymentMethod[]> {
    return await this.service.getAllPaymentMethods();
  }
}
