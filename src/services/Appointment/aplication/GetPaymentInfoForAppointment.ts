

import type { PaymentInfoForAppointment } from '@/services/Payment/domain/models/Payment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetPaymentInfoForAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(appointmentId: number): Promise<PaymentInfoForAppointment> {
    return await this.appointmentService.getPaymentInfo(appointmentId)
  }
}
