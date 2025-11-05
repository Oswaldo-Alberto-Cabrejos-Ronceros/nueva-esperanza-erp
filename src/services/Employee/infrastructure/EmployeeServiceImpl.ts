import type { EmployeeService } from '../domain/services/EmployeeService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type {
  Employee,
  EmployeeRequest,
  MyInfoEmployee,
  EmployeeList,
  StatsVeterinarianPanel,
} from '../domain/models/Employee'

export class EmployeeServiceImpl implements EmployeeService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/employee'

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
  async blockEmployee(employeeId: number, blockNote: string): Promise<void> {
    const params: Record<string, string | number> = {
      reason: blockNote,
    }
    await this.httpClient.patch(`${this.urlBase}/${employeeId}/block`, null, { params: params })
  }
  async restoreEmployee(employeeId: number): Promise<void> {
    console.log(employeeId)
    await this.httpClient.patch(`${this.urlBase}/${employeeId}/restore`)
  }
  async searchEmployees(
    status: boolean,
    dni?: string,
    cmvp?: string,
    name?: string,
    lastName?: string,
    headquarterName?: string,
    rolName?: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<EmployeeList>> {
    //params for url
    const params = new URLSearchParams()

    //for dni
    if (dni) params.append('dni', dni)
    //cmvp

    if (cmvp) params.append('cmvp', cmvp)
    //for name
    if (name) params.append('name', name)
    //for lastname
    if (lastName) params.append('lastname', lastName)
    //for status
    if (status != undefined) params.append('status', String(status))
    //for headquarter
    if (headquarterName) params.append('nameHeadquarter', headquarterName)
    //for rolname
    if (rolName) params.append('rolName', rolName)
    //for page
    if (page != undefined) params.append('page', String(page))
    //for size
    if (size != undefined) params.append('size', String(size))
    const response = await this.httpClient.get<PageResponse<EmployeeList>>(
      `${this.urlBase}/search?${params.toString()}`,
    )
    return response.data
  }
  async getEmployeeMyInfo(employeeId: number): Promise<MyInfoEmployee> {
    const response = await this.httpClient.get<MyInfoEmployee>(
      `${this.urlBase}/${employeeId}/myInfo`,
    )
    return response.data
  }
  async getVeterinarianPanelStatsToday(veterinarianId: number): Promise<StatsVeterinarianPanel> {
    const response = await this.httpClient.get<StatsVeterinarianPanel>(
      `panel-veterinarians/employee/panel-stats/today/${veterinarianId}`,
    )
    return response.data
  }
}
