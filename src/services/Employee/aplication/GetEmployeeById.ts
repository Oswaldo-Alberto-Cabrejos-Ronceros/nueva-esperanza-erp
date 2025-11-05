
import type { Employee } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class GetEmployeeById {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(employeeId: number): Promise<Employee> {
    return await this.employeeService.getEmployeeById(employeeId)
  }
}
