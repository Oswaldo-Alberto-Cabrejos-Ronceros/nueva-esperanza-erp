import type { PaymentMethodService } from '../domain/services/PaymentMethodService'
import type {
  PaymentMethod,
  PaymentMethodRequest,
  PaymentMethodList,
  TopPaymentMethods,
} from '../domain/models/PaymentMethod'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export class PaymentMethodServiceImpl implements PaymentMethodService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/payment-methods'

  async getPaymentMethodById(id: number): Promise<PaymentMethod> {
    const response = await this.httpClient.get<PaymentMethod>(`${this.url}/${id}`)
    return response.data
  }

  async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await this.httpClient.get<PaymentMethod[]>(this.url)
    return response.data
  }

  async createPaymentMethod(data: PaymentMethodRequest): Promise<PaymentMethod> {
    const response = await this.httpClient.post<PaymentMethod>(this.url, data)
    return response.data
  }

  async updatePaymentMethod(id: number, data: PaymentMethodRequest): Promise<PaymentMethod> {
    const response = await this.httpClient.put<PaymentMethod>(`${this.url}/${id}`, data)
    return response.data
  }

  async deletePaymentMethod(id: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${id}`)
  }
  async activatePaymentMethod(id: number): Promise<void> {
    await this.httpClient.put<void>(`${this.url}/${id}/activate`, {})
  }
  async searchPaymentMethods(
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<PaymentMethodList>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (name) params.name = name
    if (status !== undefined) params.status = String(status)

    const response = await this.httpClient.get<PageResponse<PaymentMethodList>>(
      `${this.url}/search`,
      { params: params },
    )
    return response.data
  }

  async getTopPaymentMethods(period: ReportPeriod): Promise<TopPaymentMethods> {
    const response = await this.httpClient.get<TopPaymentMethods>(
      `/panel-admin/payment-method/${period}`,
    )
    return response.data
  }

  async getTopPaymentMethodsByHeadquarter(
    period: ReportPeriod,
    headquarterId: number,
  ): Promise<TopPaymentMethods> {
    const response = await this.httpClient.get<TopPaymentMethods>(
      `/panel-manager/payment-method/${period}/headquarter/${headquarterId}`,
    )
    return response.data
  }
}
