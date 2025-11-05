import type { RecentPatient } from "../domain/models/Care";
import type { CareService } from "../domain/services/CareService";

export class GetRecentPatientsByEmployee {
  constructor(private readonly careService: CareService) {}

  execute(employeeId: number): Promise<RecentPatient[]> {
    return this.careService.getRecentPatientsByEmployee(employeeId)
  }
}
