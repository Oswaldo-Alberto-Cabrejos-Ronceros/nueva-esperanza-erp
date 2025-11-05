import type { WeeklyCareStatsVeterinary } from "../domain/models/Care";
import type { CareService } from "../domain/services/CareService";


export class GetWeeklyPerformanceGraphicByVeterinary {
  constructor(private readonly careService: CareService) {}

  async execute(employeeId: number): Promise<WeeklyCareStatsVeterinary> {
    return this.careService.getWeeklyPerformanceGraphicByVeterinary(employeeId)
  }
}
