import type { RecentMedicalRecord } from "../domain/models/VeterinaryRecord";
import type { VeterinaryRecordService } from "../domain/services/VeterinaryRecordService";

export class GetRecentRecordsByEmployee {
  constructor(private veterinaryRecordService: VeterinaryRecordService) {}

  execute(employeeId: number): Promise<RecentMedicalRecord[]> {
    return this.veterinaryRecordService.getRecentRecordsByEmployee(employeeId)
  }
}
