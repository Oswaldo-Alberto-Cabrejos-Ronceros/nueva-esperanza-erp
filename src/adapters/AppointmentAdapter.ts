import type { Appointment } from '@/services/Appointment/domain/models/Appointment'
import type { Appointment as AppointmentView } from '@/models/Appointment'
import { EmployeeAdapter } from './EmployeeAdapter'
import { AnimalAdapter } from './AnimalAdapter'
import type { AppointmentRequest } from '@/services/Appointment/domain/models/Appointment'
import type { AppointmentRequest as AppointmentRequestView } from '@/models/AppointmentRequest'
import type { InfoBasicAppointment } from '@/services/Appointment/domain/models/Appointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import { DateAdapter } from './DateAdapter'
import { FormatAdapter } from './FormatAdapter'
import type { AppointmentList as AppointmentListView } from '@/models/AppointmentList'
import type { AppointmentList } from '@/services/Appointment/domain/models/Appointment'
import type { InfoAppointmentForPanel as InfoAppointmentForPanelView } from '@/models/InfoAppointmentForPanel'
import type { InfoAppointmentForPanel } from '@/services/Appointment/domain/models/Appointment'
import type { AnimalInfoForAppointment } from '@/services/Appointment/domain/models/Appointment'
import type { PetInfoForAppointment } from '@/models/PetInfoForAppointment'
import type { ClientInfoForAppointment as ClientInfoForAppointmentView } from '@/models/ClientInfoForAppointment'
import type { ClientInfoForAppointment } from '@/services/Appointment/domain/models/Appointment'

import type { AppointmentInfoPanelAdmin } from '@/services/Appointment/domain/models/Appointment'
import type { AppointmentInfoPanelAdmin as AppointmentInfoPanelAdminView } from '@/models/AppointmentInfoPanelAdmin'
import type { CareAndAppointmentPanelEmployee as CareAndAppointmentPanelEmployeeView } from '@/models/CareAndAppointmentPanelEmployee'
import type { CareAndAppointmentPanelEmployee } from '@/services/Appointment/domain/models/Appointment'

export class AppointmentAdapter {
  static toAppointmentView(appoinment: Appointment): AppointmentView {
    return {
      id: appoinment.appointmentId,
      scheduleDateTime: DateAdapter.fromISOFormalToStringFull(appoinment.scheduleDateTime),
      creationDate: DateAdapter.fromISOFormalToStringFull(appoinment.creationDate),
      cancellationNote: appoinment.cancellationNote,
      statusAppointment: FormatAdapter.toCaptalizeCaseWithout_(appoinment.statusAppointment),
      headquarterVetService: { id: appoinment.headquarterVetService.id },
      assignedEmployee: appoinment.assignedEmployee
        ? EmployeeAdapter.toEmployeeView(appoinment.assignedEmployee)
        : undefined,
      pet: AnimalAdapter.toPetView(appoinment.animal),
    }
  }
  static fromAppoinmentRequestViewToAppoinmentRequest(
    appointmentRequest: AppointmentRequestView,
  ): AppointmentRequest {
    return {
      scheduleDateTime: DateAdapter.fromDateAndTimeStringToString(
        appointmentRequest.date,
        appointmentRequest.time,
      ),
      comment: appointmentRequest?.comment,
      headquarterVetServiceId: appointmentRequest.headquarterVetServiceId,
      animalId: appointmentRequest.petId,
      paymentMethodId: appointmentRequest.paymentMethodId,
    }
  }

  static fromInfoBasicAppointmentToInfoBasicAppointmentInfoClient(
    infoBasicAppointment: InfoBasicAppointment,
  ): InfoBasicAppointmentClient {
    return {
      id: infoBasicAppointment.id,
      date: infoBasicAppointment.date,
      time: infoBasicAppointment.time,
      pet: {
        name: infoBasicAppointment.animalName,
      },
      service: {
        name: infoBasicAppointment.serviceName,
        description: infoBasicAppointment.serviceDescription,
        image: infoBasicAppointment.serviceImage,
      },
      categoryService: {
        name: infoBasicAppointment.categoryServiceName,
      },
      headquarter: {
        name: infoBasicAppointment.nameHeadquarter,
        address: infoBasicAppointment.addressHeadquarter,
      },
      status: FormatAdapter.toCaptalizeCaseWithout_(infoBasicAppointment.status),
      duration: infoBasicAppointment.duration,
    }
  }

  static fromAppointementListToAppointmentListView(
    appointmentList: AppointmentList,
  ): AppointmentListView {
    return {
      id: appointmentList.appointmentId,
      petName: appointmentList.petName,
      petOwner: appointmentList.petOwner,
      date: appointmentList.day,
      headquarter: appointmentList.headquarter,
      categoryService: appointmentList.categoryService,
      appointmentStatus: FormatAdapter.toCaptalizeCaseWithout_(appointmentList.appointmentStatus),
    }
  }
  static toInfoAppointmentForPanel(
    appointment: InfoAppointmentForPanel,
  ): InfoAppointmentForPanelView {
    return {
      id: appointment.idAppointment,
      timeAppointment: appointment.timeAppointment,
      comment: appointment.comment,
      service: {
        id: appointment.serviceId,
        time: appointment.serviceTime,
        name: appointment.serviceName,
      },
      employee: {
        id: appointment.employeeId,
        name: appointment.employeeName,
        role: appointment.employeeRole,
      },
    }
  }
  static toPetInfoAppointmentView(
    animalInfoAppointment: AnimalInfoForAppointment,
  ): PetInfoForAppointment {
    return {
      id: animalInfoAppointment.animalId,
      birthdate: animalInfoAppointment.birthDate,
      name: animalInfoAppointment.name,
      urlImage: animalInfoAppointment.urlImage,
      weight: animalInfoAppointment.weight,
      breedName: animalInfoAppointment.breedName,
      speciesName: animalInfoAppointment.speciesName,
      petComment: animalInfoAppointment.animalComment,
    }
  }

  static toClientInfoForAppointmentView(
    clientInfoAppointment: ClientInfoForAppointment,
  ): ClientInfoForAppointmentView {
    return {
      clientId: clientInfoAppointment.clientId,
      fullName: clientInfoAppointment.fullName,
      phone: clientInfoAppointment.phoneNumber,
      email: clientInfoAppointment.email,
      address: clientInfoAppointment.address,
    }
  }

  static toAppointmentInfoPanelAdminView(
    infoAppointment: AppointmentInfoPanelAdmin,
  ): AppointmentInfoPanelAdminView {
    return {
      id: infoAppointment.appointmentId,
      petName: infoAppointment.animalName,
      serviceName: infoAppointment.serviceName,
      clientName: infoAppointment.clientName,
      hour: infoAppointment.hour,
      status: FormatAdapter.toCaptalizeCaseWithout_(infoAppointment.status),
    }
  }

  static toCareAndAppointmentPanelEmployeeView(
    item: CareAndAppointmentPanelEmployee,
  ): CareAndAppointmentPanelEmployeeView {
    return {
      id: item.id,
      type: item.type,
      pet: {
        id: item.animalId,
        name: item.animalName,
        breedName: item.breedName,
      },
      serviceName: item.serviceName,
      clientName: item.clientName,
      date: item.date,
      hour: item.hour,
      status: FormatAdapter.toCaptalizeCaseWithout_(item.status),
      commentAppointment: item.commentAppointment,
      employee: {
        id: item.employeeId,
        name: item.employeeName,
      },
    }
  }
}
