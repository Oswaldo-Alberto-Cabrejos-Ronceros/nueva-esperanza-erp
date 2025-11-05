import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class FindVeterinaryRecordById {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(id: number) {
    return await this.veterinaryRecordService.findById(id)
  }
}
