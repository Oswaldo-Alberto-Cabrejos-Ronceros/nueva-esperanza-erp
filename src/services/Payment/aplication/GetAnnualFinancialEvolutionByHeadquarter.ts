import type { AnnualRevenue } from '../domain/models/Payment'
import type { PaymentService } from '../domain/services/PaymentService'

export class GetAnnualFinancialEvolutionByHeadquarter {
  constructor(private readonly service: PaymentService) {}
  execute(headquarterId: number): Promise<AnnualRevenue> {
    return this.service.getAnnualFinancialEvolutionByHeadquarter(headquarterId)
  }
}
