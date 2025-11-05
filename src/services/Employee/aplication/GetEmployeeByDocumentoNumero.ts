
import type { Employee } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class GetEmployeeByDocumentoNumero {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(documentoNumero: string): Promise<Employee> {
    return await this.employeeService.getEmployeeByDocumentoNumero(documentoNumero);
  }
}
