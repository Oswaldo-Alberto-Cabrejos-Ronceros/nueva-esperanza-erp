export interface PaymentTicketService {
  downloadPaymentTicket(paymentId: number): Promise<void>
}
