export interface Payment {
  id: number
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId?: number
  paymentMethodId: number
}
