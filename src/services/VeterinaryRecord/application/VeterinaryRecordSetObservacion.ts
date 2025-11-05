import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class VeterinaryRecordSetObservacion {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(id: number) {
    return this.veterinaryRecordService.setObservacion(id)
  }
}
