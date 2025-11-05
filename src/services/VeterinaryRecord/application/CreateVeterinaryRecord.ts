import type { VeterinaryRecordRequest } from '../domain/models/VeterinaryRecord'
import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class CreateVeterinaryRecord {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}

  async execute(veterinaryRecordRequest: VeterinaryRecordRequest) {
    return await this.veterinaryRecordService.create(veterinaryRecordRequest)
  }
}
