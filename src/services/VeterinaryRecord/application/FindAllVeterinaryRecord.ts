import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class FindAllVeterinaryRecord {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute() {
    return await this.veterinaryRecordService.findAll()
  }
}
