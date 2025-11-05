import type { WeeklyIncome } from "../domain/models/Payment";
import type { PaymentService } from "../domain/services/PaymentService";

export class GetWeeklyIncomeGeneral {
  constructor(private readonly service: PaymentService) {}

  execute(): Promise<WeeklyIncome> {
    return this.service.getWeeklyIncomeGeneral()
  }
}
