import type { MonthlyCareStatsVeterinary } from "../domain/models/Care";
import type { CareService } from "../domain/services/CareService";

export class GetMonthlyPerformanceStatsByVeterinary {
  constructor(private readonly careService: CareService) {}

  async execute(employeeId: number): Promise<MonthlyCareStatsVeterinary> {
    return this.careService.getMonthlyPerformanceStatsByVeterinary(employeeId)
  }
}
