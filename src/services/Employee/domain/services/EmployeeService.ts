import type { Employee, EmployeeRequest } from '../models/Employee'

export interface EmployeeService {
  getAllEmployees(): Promise<Employee[]>
  getEmployeeById(employeeId: number): Promise<Employee>
  getEmployeeByDocumentoNumero(documentoNumero:string): Promise<Employee>
  createEmployee(employeeRequest: EmployeeRequest): Promise<Employee>
  updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee>
  blockEmployee(employeeId: number): Promise<void>
}
