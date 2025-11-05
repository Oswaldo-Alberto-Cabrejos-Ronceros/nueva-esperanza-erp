import { clinicReportUseCases } from '@/dependency-injection/clinic-report.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { CaresByVetAndHeadquarter } from '@/services/ClinicReport/domain/models/CaresByVetAndHeadquarter'

export function useClinicReport() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAppointmentsByPeriod = async (period: ReportPeriod) =>
    await runUseCase('getAppointmentsByPeriod', () =>
      clinicReportUseCases.getAppointmentsByPeriod.execute(period),
    )

  const getAppointmentsByVet = async () =>
    await runUseCase('getAppointmentsByVet', () =>
      clinicReportUseCases.getAppointmentsByVet.execute(),
    )

  const getPopularServices = async () =>
    await runUseCase('getPopularServices', () => clinicReportUseCases.getPopularServices.execute())

  const getAnimalsBySpecieOrBreed = async () =>
    await runUseCase('getAnimalsBySpecieOrBreed', () =>
      clinicReportUseCases.getAnimalsBySpecieOrBreed.execute(),
    )

  const getAppointmentsByVetAndPeriod = async (period: ReportPeriod) =>
    await runUseCase('getAppointmentsByVetAndPeriod', () =>
      clinicReportUseCases.getAppointmentsByVetAndPeriod.execute(period),
    )

  const generateAppointmentsByPeriodPdf = async (period: ReportPeriod) =>
    await runUseCase('generateAppointmentsByPeriodPdf', () =>
      clinicReportUseCases.generateAppointmentsByPeriodPdf.execute(period),
    )

  const generateAppointmentsByPeriodExcel = async (period: ReportPeriod) =>
    await runUseCase('generateAppointmentsByPeriodExcel', () =>
      clinicReportUseCases.generateAppointmentsByPeriodExcel.execute(period),
    )

  const generateAppointmentsByVetPdf = async () =>
    await runUseCase('generateAppointmentsByVetPdf', () =>
      clinicReportUseCases.generateAppointmentsByVetPdf.execute(),
    )

  const generatePopularServicesPdf = async () =>
    await runUseCase('generatePopularServicesPdf', () =>
      clinicReportUseCases.generatePopularServicesPdf.execute(),
    )

  const generateAnimalsBySpecieOrBreedPdf = async () =>
    await runUseCase('generateAnimalsBySpecieOrBreedPdf', () =>
      clinicReportUseCases.generateAnimalsBySpecieOrBreedPdf.execute(),
    )

  const generateAppointmentsByVetAndPeriodPdf = async (period: ReportPeriod) =>
    await runUseCase('generateAppointmentsByVetAndPeriodPdf', () =>
      clinicReportUseCases.generateAppointmentsByVetAndPeriodPdf.execute(period),
    )

  const generateAppointmentsByVetAndPeriodExcel = async (period: ReportPeriod) =>
    await runUseCase('generateAppointmentsByVetAndPeriodExcel', () =>
      clinicReportUseCases.generateAppointmentsByVetAndPeriodExcel.execute(period),
    )


    const getCaresByVetAndHeadquarter = async (): Promise<CaresByVetAndHeadquarter[]> => {
  return await runUseCase('getCaresByVetAndHeadquarter', () =>
    clinicReportUseCases.getCaresByVetAndHeadquarter.execute(),
  )
}

const getCaresByVetAndHeadquarterPdf = async (): Promise<Blob> => {
  return await runUseCase('getCaresByVetAndHeadquarterPdf', () =>
    clinicReportUseCases.getCaresByVetAndHeadquarterPdf.execute(),
  )
}


  return {
    loading,
    error,

    getAppointmentsByPeriod,
    getAppointmentsByVet,
    getPopularServices,
    getAnimalsBySpecieOrBreed,
    getAppointmentsByVetAndPeriod,

    generateAppointmentsByPeriodPdf,
    generateAppointmentsByPeriodExcel,
    generateAppointmentsByVetPdf,
    generatePopularServicesPdf,
    generateAnimalsBySpecieOrBreedPdf,
    generateAppointmentsByVetAndPeriodPdf,
    generateAppointmentsByVetAndPeriodExcel,
    getCaresByVetAndHeadquarter,
    getCaresByVetAndHeadquarterPdf
  }
}
