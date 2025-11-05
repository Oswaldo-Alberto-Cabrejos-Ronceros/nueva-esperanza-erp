
import type { Employee, EmployeeRequest } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class CreateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(employeeRequest: EmployeeRequest): Promise<Employee> {
    return await this.employeeService.createEmployee(employeeRequest)
  }
}
