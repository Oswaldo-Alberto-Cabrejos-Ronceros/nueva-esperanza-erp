import type { PaymentMethodService } from '../domain/services/PaymentMethodService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { PaymentMethodList } from '../domain/models/PaymentMethod'

export class SearchPaymentMethod {
  constructor(private readonly service: PaymentMethodService) {}

  execute(
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<PaymentMethodList>> {
    return this.service.searchPaymentMethods(page, size, name, status)
  }
}
