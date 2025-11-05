import type { Animal } from '@/services/Animal/domain/models/Animal'
import type { Employee } from '@/services/Employee/domain/models/Employee'

export interface Appointment {
  appointmentId: number
  scheduleDateTime: string
  creationDate: string
  cancellationNote?: string
  statusAppointment: string
  headquarterVetService: { id: number }
  assignedEmployee?: Employee
  animal: Animal
}

export interface AppointmentRequest {
  scheduleDateTime: string
  comment?: string
  headquarterVetServiceId: number
  animalId: number
  paymentMethodId: number
}

export interface TimesForTurn {
  turn: string
  times: FormatTime[]
}

export interface FormatTime {
  time: string
  timeRange: string
}

export interface BasicServiceForAppointment {
  headquarterServiceId: number
  serviceId: number
  name: string
  description: string
  price: string
  duration: number
  specieName: string
  serviceImageUrl: string
  categoryName: string
}

export interface InfoBasicAppointment {
  id: number
  date: string
  time: string
  animalName: string
  serviceName: string
  serviceDescription: string
  serviceImage: string
  categoryServiceName: string
  status: string
  duration: number
  nameHeadquarter: string
  addressHeadquarter: string
}

export interface AppointmentList {
  appointmentId: number
  petName: string
  petOwner: string
  day: string
  headquarter: string
  categoryService: string
  appointmentStatus: string
}

export interface InfoAppointmentForPanel {
  idAppointment: number
  timeAppointment: string
  comment: string
  serviceId: number
  serviceTime: number
  serviceName: string
  employeeId: number
  employeeName: string
  employeeRole: string
}

export interface AnimalInfoForAppointment {
  animalId: number
  birthDate: string
  name: string
  urlImage: string
  weight: number
  breedName: string
  speciesName: string
  animalComment: string
}

export interface ClientInfoForAppointment {
  clientId: string
  fullName: string
  phoneNumber: string
  email: string
  address: string
}

export interface AppointmentStatsToday {
  totalAppointments: number
  todayRegisteredAppointments: number
}

export interface AppointmentInfoPanelAdmin {
  appointmentId: number
  animalName: string
  serviceName: string
  clientName: string
  hour: string
  status: string
}

export interface CareAndAppointmentPanelEmployee {
  id: number
  type: string
  animalId: number
  animalName: string
  serviceName: string
  clientName: string
  date: string
  hour: string
  status: string
  commentAppointment: string
  employeeId?: number
  employeeName?: string
  breedName: string
}

export interface AppointmentStatsForReceptionist {
  totalAppointmentsToday: number
  confirmedAppointmentsToday: number
  pendingAppointmentsToday: number
}

export interface OperationalMonthlyStats {
  totalPatients: number
  totalClients: number
  activeVeterinarians: number
  avgIncomePerVet: number
}

export interface DailyAppointmentStats {
  dayLabels: string[]
  completedCounts: number[]
  cancelledCounts: number[]
}
export interface VeterinarianPerformance {
  employeesNames: string[]
  totalPatients: number[]
  totalAppointments: number[]
}
