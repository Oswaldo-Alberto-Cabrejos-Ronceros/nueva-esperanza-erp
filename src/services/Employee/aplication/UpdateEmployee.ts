import type { Employee, EmployeeRequest } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class UpdateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee> {
    return await this.employeeService.updateEmployee(employeeId, employeeRequest)
  }
}
