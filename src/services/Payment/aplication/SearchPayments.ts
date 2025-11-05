import type { PaymentService } from "../domain/services/PaymentService";

export class SearchPayments{
  constructor(private readonly paymentService: PaymentService) {}
  async execute(page: number,
    size: number,
    options: {
      dni?: string
      headquarterId?: number
      serviceId?: number
      status?: string
      startDate?: string
      endDate?: string
    },
    sort?: string,){
      return this.paymentService.searchPayments(page,size,options,sort)
    }
}
