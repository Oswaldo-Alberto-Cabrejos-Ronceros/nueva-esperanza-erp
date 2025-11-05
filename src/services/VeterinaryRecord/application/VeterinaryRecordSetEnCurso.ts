import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class VeterinaryRecordSetEnCurso {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(id: number) {
    return this.veterinaryRecordService.setEnCurso(id)
  }
}
