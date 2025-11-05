import type { PaymentService } from "../domain/services/PaymentService";

export class GetAllPaymentsForTable{
  constructor(private readonly paymentService: PaymentService) {}
  async execute(page: number, size: number, sort?: string){
    return this.paymentService.getAllPaymentsForTable(page,size,sort);
  }
}

