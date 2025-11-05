import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { PaymentService } from '../domain/services/PaymentService'
import type { IncomePerHeadquarter } from '../domain/models/Payment'

export class GetIncomePerHeadquarterByPeriod {
  constructor(private readonly service: PaymentService) {}
  execute(period: ReportPeriod): Promise<IncomePerHeadquarter> {
    return this.service.getIncomePerHeadquarterByPeriod(period)
  }
}
