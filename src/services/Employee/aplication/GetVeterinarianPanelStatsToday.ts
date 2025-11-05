import type { StatsVeterinarianPanel } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class GetVeterinarianPanelStatsToday {
  constructor(private readonly employeeService: EmployeeService) {}

  execute(veterinarianId: number): Promise<StatsVeterinarianPanel> {
    return this.employeeService.getVeterinarianPanelStatsToday(veterinarianId)
  }
}
