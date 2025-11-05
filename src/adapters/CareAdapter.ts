import type { Care } from '@/services/Care/domain/models/Care'
import type { Care as CareView } from '@/models/Care'
import type { FormValues as AddCareFromAppoinmentSchema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'
import type { CreateCareFromAppointmentRequest } from '@/services/Care/domain/models/Care'
import type { CareRequestCreate } from '@/services/Care/domain/models/Care'
import { FormatAdapter } from './FormatAdapter'
import type { CareList as CareListView } from '@/models/CareList'
import type { CareList } from '@/services/Care/domain/models/Care'

export class CareAdapter {
  static toView(care: Care): CareView {
    return {
      id: care.careId,
      dateTime: care.dateTime,
      statusCare: FormatAdapter.toCaptalizeCaseWithout_(care.statusCare),
      headquarterVetService: {
        id: care.headquarterVetServiceId,
      },
      appointment: {
        id: care?.appointmentId,
      },
      pet: {
        id: care.animalId,
      },
      employee: {
        id: care.employeeId,
      },
    }
  }
  static fromSchemaToCreateCareFromAppointmentRequest(
    schema: AddCareFromAppoinmentSchema,
  ): CreateCareFromAppointmentRequest {
    return {
      appointmentId: schema.appointmentId,
      employeeId: schema.employeeId,
    }
  }

  static fromSchemaToCareRequestCreate(schema: AddCareFromRequestSchema): CareRequestCreate {
    return {
      headquarterVetServiceId: schema.headquarterVetServiceId,
      animalId: schema.petId,
      employeeId: schema.employeeId,
      paymentMethodId:schema.paymentMethodId
    }
  }

  static fromCareListToCareListView(care: CareList): CareListView {
    return {
      id: care.careId,
      careDateTime: care.careDateTime,
      status: FormatAdapter.toCaptalizeCaseWithout_(care.statusCare),
      pet: {
        name: care.animalName,
        specieName: care.animalSpecies,
        breedName: care.animalBreed,
      },
      employee: {
        fullName: care.employeeFullName,
      },
      service: {
        name: care.serviceName,
        price: care.servicePrice,
      },
      headquarter: {
        name: care.headquarterName,
      },
      appointment: {
        id: care.appointmentId,
      },
    }
  }
}
