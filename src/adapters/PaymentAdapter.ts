import type { Payment } from '@/services/Payment/domain/models/Payment'
import type { Payment as PaymentView } from '@/models/Payment'
import type { PaymentList } from '@/services/Payment/domain/models/Payment'
import type { PaymentList as PaymentListView } from '@/models/PaymentList'
import { FormatAdapter } from './FormatAdapter'
import type { RecentPayment } from '@/services/Payment/domain/models/Payment'
import type { RecentPayment as RecentPaymentView } from '@/models/RecientPayment'
import type { PaymentInfoForAppointment as PaymentInfoForAppointmentView } from '@/models/PaymentInfoForAppointment'
import type { PaymentInfoForAppointment } from '@/services/Payment/domain/models/Payment'

export class PaymentAdapter {
  static toPaymentView(payment: Payment): PaymentView {
    return {
      id: payment.paymentId,
      amount: payment.amount,
      paymentDateTime: payment.paymentDateTime,
      status: FormatAdapter.toCaptalizeCaseWithout_(payment.status),
      appointmentId: payment.appointmentId,
      careId: payment.careId,
      paymentMethodId: payment.paymentMethodId,
    }
  }

  static fromPaymentListToPaymentListView(paymentList: PaymentList): PaymentListView {
    return {
      id: paymentList.id,
      headquarterName: paymentList.headquarterName,
      serviceName: paymentList.serviceName,
      clientDni: paymentList.clientDni,
      amount: paymentList.amount,
      status: FormatAdapter.toCaptalizeCaseWithout_(paymentList.status),
      paymentMethod: paymentList.paymentMethod,
      paymentDate: paymentList.paymentDate,
    }
  }

  static toRecentPaymentView(payment: RecentPayment): RecentPaymentView {
    return {
      id: payment.paymentId,
      clientFullName: payment.clientFullName,
      clientInitials: payment.clientInitials,
      petName: payment.animalName,
      serviceName: payment.serviceName,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      paymentTime: payment.paymentTime,
      paymentStatus: FormatAdapter.toCaptalizeCaseWithout_(payment.paymentStatus),
    }
  }

  static toPaymentInfoForAppointmentView(
    paymentInfo: PaymentInfoForAppointment,
  ): PaymentInfoForAppointmentView {
    return {
      paymentId: paymentInfo.paymentId,
      amount: paymentInfo.amount,
      serviceName: paymentInfo.serviceName,
      paymentMethod: {
        id: paymentInfo.paymentMethodId,
        name: paymentInfo.paymentMethod,
      },
      status: FormatAdapter.toCaptalizeCaseWithout_(paymentInfo.paymentStatus),
    }
  }
}
