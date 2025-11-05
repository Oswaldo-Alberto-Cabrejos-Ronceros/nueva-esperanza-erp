import type { EmployeeService } from '../domain/services/EmployeeService'

export class BlockEmployee {
  constructor(private readonly employeeService: EmployeeService) {}
  async execute(employeeId: number) {
    await this.employeeService.blockEmployee(employeeId)
  }
}
