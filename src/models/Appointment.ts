import type { Employee } from "./Employee"
import type { Pet } from "./Pet"

export interface Appointment {
  id: number
  scheduleDateTime: string
  creationDate: string
  cancellationNote?: string
  statusAppointment: string
  headquarterVetService:{id:number}
  assignedEmployee?:Employee
  pet:Pet
}
