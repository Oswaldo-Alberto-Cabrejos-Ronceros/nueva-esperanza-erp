import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { FinancialReportServiceImpl } from '@/services/FinancialReport/infrastructure/FinancialReportServiceImpl'
import { GetIncomeByPeriod } from '@/services/FinancialReport/aplication/GetIncomeByPeriod'
import { GetIncomeByServicePdf } from '@/services/FinancialReport/aplication/GetIncomeByServicePdf'
import { GetIncomeBySpeciePdf } from '@/services/FinancialReport/aplication/GetIncomeBySpeciePdf'
import { GetIncomeByPaymentMethodExcel } from '@/services/FinancialReport/aplication/GetIncomeByPaymentMethodExcel'
import { GetIncomeByPeriodAndServicePdf } from '@/services/FinancialReport/aplication/GetIncomeByPeriodAndServicePdf'
import { GetIncomeByHeadquarterPdf } from '@/services/FinancialReport/aplication/GetIncomeByHeadquarterPdf'
import { GetIncomeByHeadquarterPeriodPdf } from '@/services/FinancialReport/aplication/GetIncomeByHeadquarterPeriodPdf'

const httpClient = new AxiosHttpClient()

const financialReportService = new FinancialReportServiceImpl(httpClient)

// export uses cases
export const financialReportUseCases = {
  getIncomeByPeriod: new GetIncomeByPeriod(financialReportService),
  generateIncomeByPeriodPdf: new GetIncomeByPeriod(financialReportService),
  getIncomeByServicePdf: new GetIncomeByServicePdf(financialReportService),
  getIncomeBySpeciePdf: new GetIncomeBySpeciePdf(financialReportService),
  getIncomeByPaymentMethodExcel: new GetIncomeByPaymentMethodExcel(financialReportService),
  getIncomeByPeriodAndServicePdf: new GetIncomeByPeriodAndServicePdf(financialReportService),
  getIncomeByHeadquarterPdf: new GetIncomeByHeadquarterPdf(financialReportService),
  getIncomeByHeadquarterPeriodPdf: new GetIncomeByHeadquarterPeriodPdf(financialReportService),
}
