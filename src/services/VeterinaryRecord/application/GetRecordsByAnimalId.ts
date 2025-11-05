
import type { VeterinaryRecordInfoTable } from "../domain/models/VeterinaryRecord";
import type { VeterinaryRecordService } from "../domain/services/VeterinaryRecordService";

export class GetRecordsByAnimalId {
  constructor(private readonly service: VeterinaryRecordService) {}

  async execute(animalId: number): Promise<VeterinaryRecordInfoTable[]> {
    return await this.service.getRecordsByAnimalId(animalId)
  }
}
