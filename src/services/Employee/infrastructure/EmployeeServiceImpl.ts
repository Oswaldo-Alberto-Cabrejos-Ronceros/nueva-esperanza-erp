import type { EmployeeService } from '../domain/services/EmployeeService'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Employee, EmployeeRequest } from '../domain/models/Employee'

export class EmployeeServiceImpl implements EmployeeService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/empleados'

  async getEmployeeByDocumentoNumero(documentoNumero: string): Promise<Employee> {
    const response = await this.httpClient.get<Employee>(
      `${this.urlBase}/numero_documento/${documentoNumero}`,
    )
    return response.data
  }

  async getAllEmployees(): Promise<Employee[]> {
    const response = await this.httpClient.get<Employee[]>(this.urlBase)
    return response.data
  }
  async getEmployeeById(employeeId: number): Promise<Employee> {
    const response = await this.httpClient.get<Employee>(`${this.urlBase}/${employeeId}`)
    return response.data
  }
  async createEmployee(employeeRequest: EmployeeRequest): Promise<Employee> {
    const response = await this.httpClient.post<Employee>(this.urlBase, employeeRequest)
    return response.data
  }
  async updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee> {
    const response = await this.httpClient.put<Employee>(
      `${this.urlBase}/${employeeId}`,
      employeeRequest,
    )
    return response.data
  }
  async blockEmployee(employeeId: number): Promise<void> {
    await this.httpClient.put(`${this.urlBase}/${employeeId}`, null)
  }
}
