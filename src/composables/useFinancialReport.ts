import { financialReportUseCases } from '@/dependency-injection/financial-report.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export function useFinancialReport() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getIncomeByPeriod = async (period: ReportPeriod): Promise<Blob> => {
    return await runUseCase('getIncomeByPeriod', () =>
      financialReportUseCases.getIncomeByPeriod.execute(period),
    )
  }

  const getIncomeByServicePdf = async (): Promise<Blob> => {
    return await runUseCase('getIncomeByServicePdf', () =>
      financialReportUseCases.getIncomeByServicePdf.execute(),
    )
  }

  const getIncomeBySpeciePdf = async (): Promise<Blob> => {
    return await runUseCase('getIncomeBySpeciePdf', () =>
      financialReportUseCases.getIncomeBySpeciePdf.execute(),
    )
  }

  const getIncomeByPaymentMethodExcel = async (): Promise<Blob> => {
    return await runUseCase('getIncomeByPaymentMethodExcel', () =>
      financialReportUseCases.getIncomeByPaymentMethodExcel.execute(),
    )
  }

  const getIncomeByPeriodAndServicePdf = async (period: ReportPeriod): Promise<Blob> => {
    return await runUseCase('getIncomeByPeriodAndServicePdf', () =>
      financialReportUseCases.getIncomeByPeriodAndServicePdf.execute(period),
    )
  }

  const getIncomeByHeadquarterPdf = async (): Promise<Blob> => {
    return await runUseCase('getIncomeByHeadquarterPdf', () =>
      financialReportUseCases.getIncomeByHeadquarterPdf.execute(),
    )
  }

  const getIncomeByHeadquarterPeriodPdf = async (period: ReportPeriod): Promise<Blob> => {
    return await runUseCase('getIncomeByHeadquarterPeriodPdf', () =>
      financialReportUseCases.getIncomeByHeadquarterPeriodPdf.execute(period),
    )
  }

  return {
    loading,
    error,
    getIncomeByPeriod,
    getIncomeByServicePdf,
    getIncomeBySpeciePdf,
    getIncomeByPaymentMethodExcel,
    getIncomeByPeriodAndServicePdf,
    getIncomeByHeadquarterPdf,
    getIncomeByHeadquarterPeriodPdf,
  }
}
