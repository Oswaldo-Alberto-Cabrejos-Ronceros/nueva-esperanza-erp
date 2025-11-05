import { paymentTicketUsesCases } from '@/dependency-injection/payment-ticket.container'
import { useAsyncHandler } from './useAsyncHandler'

export function usePaymentTicket() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const downloadPaymentTicket = async (paymentId: number): Promise<void> => {
    await runUseCase('downloadTicket', () =>
      paymentTicketUsesCases.downloadPaymentTicket.execute(paymentId),
    )
  }

  return {
    loading,
    error,
    downloadPaymentTicket,
  }
}
