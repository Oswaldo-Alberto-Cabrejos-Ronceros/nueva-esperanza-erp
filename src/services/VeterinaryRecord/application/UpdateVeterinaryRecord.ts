import type { VeterinaryRecordRequest } from '../domain/models/VeterinaryRecord'
import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class UpdateVeterinaryRecord {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(id: number, veterinaryRecordRequest: VeterinaryRecordRequest) {
    return await this.veterinaryRecordService.update(id, veterinaryRecordRequest)
  }
}
