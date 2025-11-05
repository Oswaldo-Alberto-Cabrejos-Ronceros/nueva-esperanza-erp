import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class GetAllInfoVeterinaryRecordsByAnimal {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(animalId: number, page?: number, size?: number) {
    return await this.veterinaryRecordService.getAllInfoVeterinaryRecordsByAnimal(
      animalId,
      page,
      size,
    )
  }
}
