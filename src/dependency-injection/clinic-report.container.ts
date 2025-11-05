import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { ClinicReportServiceImpl } from '@/services/ClinicReport/infrastructure/ClinicReportServiceImpl'
import { GetAppointmentsByPeriod } from '@/services/ClinicReport/aplication/GetAppointmentsByPeriod'
import { GetAppointmentsByVet } from '@/services/ClinicReport/aplication/GetAppointmentsByVet'
import { GetPopularServices } from '@/services/ClinicReport/aplication/GetPopularServices'
import { GetAnimalsBySpecieOrBreed } from '@/services/ClinicReport/aplication/GetAnimalsBySpecieOrBreed'
import { GetAppointmentsByVetAndPeriod } from '@/services/ClinicReport/aplication/GetAppointmentsByVetAndPeriod'
import { GenerateAppointmentsByPeriodPdf } from '@/services/ClinicReport/aplication/GenerateAppointmentsByPeriodPdf'
import { GenerateAppointmentsByPeriodExcel } from '@/services/ClinicReport/aplication/GenerateAppointmentsByPeriodExcel'
import { GenerateAppointmentsByVetPdf } from '@/services/ClinicReport/aplication/GenerateAppointmentsByVetPdf'
import { GeneratePopularServicesPdf } from '@/services/ClinicReport/aplication/GeneratePopularServicesPdf'
import { GenerateAnimalsBySpecieOrBreedPdf } from '@/services/ClinicReport/aplication/GenerateAnimalsBySpecieOrBreedPdf'
import { GenerateAppointmentsByVetAndPeriodPdf } from '@/services/ClinicReport/aplication/GenerateAppointmentsByVetAndPeriodPdf'
import { GenerateAppointmentsByVetAndPeriodExcel } from '@/services/ClinicReport/aplication/GenerateAppointmentsByVetAndPeriodExcel'
import { GetCaresByVetAndHeadquarter } from '@/services/ClinicReport/aplication/GetCaresByVetAndHeadquarter'
import { GetCaresByVetAndHeadquarterPdf } from '@/services/ClinicReport/aplication/GetCaresByVetAndHeadquarterPdf'

const httpClient = new AxiosHttpClient()

const clinicReportService = new ClinicReportServiceImpl(httpClient)

//export uses cases
export const clinicReportUseCases = {
  getAppointmentsByPeriod: new GetAppointmentsByPeriod(clinicReportService),
  getAppointmentsByVet: new GetAppointmentsByVet(clinicReportService),
  getPopularServices: new GetPopularServices(clinicReportService),
  getAnimalsBySpecieOrBreed: new GetAnimalsBySpecieOrBreed(clinicReportService),
  getAppointmentsByVetAndPeriod: new GetAppointmentsByVetAndPeriod(clinicReportService),

  generateAppointmentsByPeriodPdf: new GenerateAppointmentsByPeriodPdf(clinicReportService),
  generateAppointmentsByPeriodExcel: new GenerateAppointmentsByPeriodExcel(clinicReportService),
  generateAppointmentsByVetPdf: new GenerateAppointmentsByVetPdf(clinicReportService),
  generatePopularServicesPdf: new GeneratePopularServicesPdf(clinicReportService),
  generateAnimalsBySpecieOrBreedPdf: new GenerateAnimalsBySpecieOrBreedPdf(clinicReportService),
  generateAppointmentsByVetAndPeriodPdf: new GenerateAppointmentsByVetAndPeriodPdf(
    clinicReportService,
  ),
  generateAppointmentsByVetAndPeriodExcel: new GenerateAppointmentsByVetAndPeriodExcel(
    clinicReportService,
  ),
  getCaresByVetAndHeadquarter: new GetCaresByVetAndHeadquarter(clinicReportService),
  getCaresByVetAndHeadquarterPdf: new GetCaresByVetAndHeadquarterPdf(clinicReportService),
}
