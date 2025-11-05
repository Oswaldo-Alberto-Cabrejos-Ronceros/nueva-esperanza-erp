import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { TopPaymentMethods } from '../domain/models/PaymentMethod'
import type { PaymentMethodService } from '../domain/services/PaymentMethodService'

export class GetTopPaymentMethods {
  constructor(private readonly service: PaymentMethodService) {}

  execute(period: ReportPeriod): Promise<TopPaymentMethods> {
    return this.service.getTopPaymentMethods(period)
  }
}
