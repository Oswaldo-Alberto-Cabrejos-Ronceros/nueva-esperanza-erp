import type { PageResponse } from '@/services/models/PageResponse'
import type { Employee, EmployeeRequest, MyInfoEmployee, StatsVeterinarianPanel } from '../models/Employee'
import type { EmployeeList } from '../models/Employee'

export interface EmployeeService {
  getAllEmployees(): Promise<Employee[]>
  getEmployeeById(employeeId: number): Promise<Employee>
  createEmployee(employeeRequest: EmployeeRequest): Promise<Employee>
  updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee>
  blockEmployee(employeeId: number,blockNote:string): Promise<void>
  restoreEmployee(employeeId: number): Promise<void>
  searchEmployees(
    status: boolean,
    dni?: string,
    cmvp?:string,
    name?: string,
    lastName?: string,
    headquarterName?: string,
    rolName?:string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<EmployeeList>>
  getEmployeeMyInfo(employeeId: number): Promise<MyInfoEmployee>
getVeterinarianPanelStatsToday(veterinarianId: number): Promise<StatsVeterinarianPanel>

}
