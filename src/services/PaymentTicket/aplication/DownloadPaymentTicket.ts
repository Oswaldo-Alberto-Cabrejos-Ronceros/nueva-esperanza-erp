import type { PaymentTicketService } from '../domain/services/PaymentTicketService'

export class DownloadPaymentTicket {
  constructor(private readonly service: PaymentTicketService) {}

  async execute(paymentId: number): Promise<void> {
    return await this.service.downloadPaymentTicket(paymentId)
  }
}
