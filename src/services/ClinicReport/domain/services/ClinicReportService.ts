import type { ReportPeriod } from "@/services/enums/ReportPeriod"
import type { AppointmentsByVet } from "../models/AppointmentsByVet"
import type { AppointmentsByTime } from "../models/AppointmentsByTime"
import type { PopularService } from "../models/PopularService"
import type { AnimalByType } from "../models/AnimalByType"
import type { AppointmentsByVetAndPeriod } from "../models/AppointmentsByVetAndPeriod"
import type { CaresByVetAndHeadquarter } from "../models/CaresByVetAndHeadquarter"

export interface ClinicReportService {
  getAppointmentsByPeriod(period: ReportPeriod): Promise<AppointmentsByTime[]>
  generateAppointmentsByPeriodPdf(period: ReportPeriod): Promise<Blob>
  generateAppointmentsByPeriodExcel(period: ReportPeriod): Promise<Blob>

  getAppointmentsByVet(): Promise<AppointmentsByVet[]>
  generateAppointmentsByVetPdf(): Promise<Blob>

  getPopularServices(): Promise<PopularService[]>
  generatePopularServicesPdf(): Promise<Blob>

  getAnimalsBySpecieOrBreed(): Promise<AnimalByType[]>
  generateAnimalsBySpecieOrBreedPdf(): Promise<Blob>

  getAppointmentsByVetAndPeriod(period: ReportPeriod): Promise<AppointmentsByVetAndPeriod[]>
  generateAppointmentsByVetAndPeriodPdf(period: ReportPeriod): Promise<Blob>
  generateAppointmentsByVetAndPeriodExcel(period: ReportPeriod): Promise<Blob>
getCaresByVetAndHeadquarter(): Promise<CaresByVetAndHeadquarter[]>
getCaresByVetAndHeadquarterPdf(): Promise<Blob>
}
