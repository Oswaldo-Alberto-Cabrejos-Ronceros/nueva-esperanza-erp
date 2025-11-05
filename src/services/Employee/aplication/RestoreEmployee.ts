import type { EmployeeService } from '../domain/services/EmployeeService'

export class RestoreEmployee {
  constructor(private readonly employeeService: EmployeeService) {}
  async execute(employeeId: number) {
    await this.employeeService.restoreEmployee(employeeId)
  }
}
