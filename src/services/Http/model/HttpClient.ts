import type { RequestConfig } from './RequestConfig'

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<{ data: T }>
  post<T>(url: string, body: unknown, config?: RequestConfig): Promise<{ data: T }>
  put<T>(url: string, body: unknown, config?: RequestConfig): Promise<{ data: T }>
  patch<T>(url: string, body?: unknown, config?: RequestConfig): Promise<{ data: T }>
  delete<T>(url: string, config?: RequestConfig): Promise<{ data: T }>
}
