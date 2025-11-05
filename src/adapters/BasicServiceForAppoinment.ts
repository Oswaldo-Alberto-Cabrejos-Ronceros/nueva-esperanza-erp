import type { BasicServiceForAppointment } from '@/services/Appointment/domain/models/Appointment'
import type { BasicServiceForAppointment as BasicServiceForAppointmentView } from '@/models/BasicServiceForAppointment'

export class BasicServiceForAppointmentAdapter {
  static toBasicServiceForAppointmentView(
    basicServiceForAppointment: BasicServiceForAppointment,
  ): BasicServiceForAppointmentView {
    return {
      headquarterServiceId: basicServiceForAppointment.headquarterServiceId,
      id: basicServiceForAppointment.serviceId,
      name: basicServiceForAppointment.name,
      description: basicServiceForAppointment.description,
      price: basicServiceForAppointment.price,
      duration: basicServiceForAppointment.duration,
      imageUrl: basicServiceForAppointment.serviceImageUrl,
      category: {
        name: basicServiceForAppointment.categoryName,
      },
      specie: {
        name: basicServiceForAppointment.specieName,
      },
    }
  }
}
