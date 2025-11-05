import type { PageResponse } from '@/services/models/PageResponse'
import type { EmployeeService } from '../domain/services/EmployeeService'
import type { EmployeeList } from '../domain/models/Employee'

export class SearchEmployees {
  constructor(private readonly employeeService: EmployeeService) {}
  async execute(
    status: boolean,
    dni?: string,
    cmvp?:string,
    name?: string,
    lastName?: string,
    headquarterName?: string,
    rolName?: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<EmployeeList>> {
    return await this.employeeService.searchEmployees(
      status,
      dni,
      cmvp,
      name,
      lastName,
      headquarterName,
      rolName,
      page,
      size,
    )
  }
}
