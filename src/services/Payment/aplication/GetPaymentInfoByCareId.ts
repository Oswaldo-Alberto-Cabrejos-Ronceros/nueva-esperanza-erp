import type { PaymentService } from '../domain/services/PaymentService'
import type { PaymentInfoForAppointment } from '../domain/models/Payment'

export class GetPaymentInfoByCareId {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(careId: number): Promise<PaymentInfoForAppointment> {
    return await this.paymentService.getPaymentInfoByCareId(careId)
  }
}
