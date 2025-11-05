export interface PaymentInfoForAppointment {
  paymentId: number
  amount: number
  serviceName: string
  paymentMethod: {
    id: number
    name: string

  }
      status: string
}
