import type { AnnualRevenue } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetAnnualFinancialEvolution {
  constructor(private readonly service: PaymentService) {}
  execute(): Promise<AnnualRevenue> {
    return this.service.getAnnualFinancialEvolution()
  }
}
