import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'

export class DeleteVeterinaryService {
  constructor(private readonly service: VeterinaryServiceService) {}

  async execute(id: number): Promise<void> {
    await this.service.deleteVeterinaryService(id)
  }
}
