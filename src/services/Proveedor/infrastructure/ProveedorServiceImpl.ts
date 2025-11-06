import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Proveedor, ProveedorRequest } from '../domain/models/Proveedor'
import type { ProveedorService } from '../domain/services/ProveedorService'

export class ProveedorServiceImpl implements ProveedorService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/proveedores'

  async getAllProveedores(): Promise<Proveedor[]> {
    const response = await this.httpClient.get<Proveedor[]>(this.urlBase)
    return response.data
  }

  async getProveedorById(proveedorId: number): Promise<Proveedor> {
    const response = await this.httpClient.get<Proveedor>(`${this.urlBase}/${proveedorId}`)
    return response.data
  }
  async getProveedorByNombre(documentoNumero: string): Promise<Proveedor> {
    const response = await this.httpClient.get<Proveedor>(
      `${this.urlBase}/nombre/${documentoNumero}`,
    )
    return response.data
  }

  async createProveedor(proveedorRequest: ProveedorRequest): Promise<Proveedor> {
        const response = await this.httpClient.post<Proveedor>(this.urlBase, proveedorRequest)
        return response.data
  }
  async updateProveedor(proveedorId: number, proveedorRequest: ProveedorRequest): Promise<Proveedor> {
        const response = await this.httpClient.put<Proveedor>(
          `${this.urlBase}/${proveedorId}`,
          proveedorRequest,
        )
        return response.data
  }
  async blockProveedor(proveedorId: number): Promise<void> {
    await this.httpClient.put(`${this.urlBase}/${proveedorId}`, null)
  }
}
