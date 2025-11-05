import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PaymentTicketService } from '../domain/services/PaymentTicketService'

export class PaymentTicketServiceImpl implements PaymentTicketService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly baseUrl = '/boletas'

  async downloadPaymentTicket(paymentId: number): Promise<void> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/${paymentId}`, {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `boleta-${paymentId}.pdf`
    link.click()

    window.URL.revokeObjectURL(url)
  }
}
