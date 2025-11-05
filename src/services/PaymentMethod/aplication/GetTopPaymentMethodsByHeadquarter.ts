import type { ReportPeriod } from "@/services/enums/ReportPeriod";
import type { TopPaymentMethods } from "../domain/models/PaymentMethod";
import type { PaymentMethodService } from "../domain/services/PaymentMethodService";

export class GetTopPaymentMethodsByHeadquarter {
  constructor(private readonly service: PaymentMethodService) {}

  execute(period: ReportPeriod, headquarterId: number): Promise<TopPaymentMethods> {
    return this.service.getTopPaymentMethodsByHeadquarter(period, headquarterId)
  }
}
