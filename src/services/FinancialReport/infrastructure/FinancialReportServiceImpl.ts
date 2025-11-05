import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { FinancialReportService } from '../domain/services/FinantialReportService'

export class FinancialReportServiceImpl implements FinancialReportService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly baseUrl = '/reports/financial'

  async getIncomeByPeriod(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/income/${period}`)
    return response.data
  }

  async getIncomeByServicePdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/income/by-service`, {
      responseType: 'blob',
    })
    return response.data
  }

  async getIncomeBySpeciePdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/income/by-specie`, {
      responseType: 'blob',
    })
    return response.data
  }

  async getIncomeByPaymentMethodExcel(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/payment-method`, {
      responseType: 'blob',
    })
    return response.data
  }

  async getIncomeByPeriodAndServicePdf(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/income/by-period-service/${period}`,
      {
        responseType: 'blob',
      },
    )
    return response.data
  }

  async getIncomeByHeadquarterPdf(): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(`${this.baseUrl}/income/by-headquarter/pdf`, {
      responseType: 'blob',
    })
    return response.data
  }

  async getIncomeByHeadquarterPeriodPdf(period: ReportPeriod): Promise<Blob> {
    const response = await this.httpClient.get<Blob>(
      `${this.baseUrl}/income/by-headquarter/period/pdf?period=${period}`,
      {
        responseType: 'blob',
      },
    )
    return response.data
  }
}
