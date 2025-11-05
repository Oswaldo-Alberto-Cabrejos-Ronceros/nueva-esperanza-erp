export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  responseType?: 'json' | 'blob' | 'text'; 
}
