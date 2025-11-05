import type { VeterinaryRecordStats } from "../domain/models/VeterinaryRecord";
import type { VeterinaryRecordService } from "../domain/services/VeterinaryRecordService";

export class GetVeterinaryRecordStatsByVeterinarian {
  constructor(private readonly service: VeterinaryRecordService) {}

  async execute(employeeId: number): Promise<VeterinaryRecordStats> {
    return await this.service.getStatsByVeterinarian(employeeId)
  }
}
