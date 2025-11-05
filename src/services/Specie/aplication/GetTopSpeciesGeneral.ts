import type { TopSpeciesByAppointments } from "../domain/models/Specie";
import type { SpecieService } from "../domain/services/SpecieService";

export class GetTopSpeciesGeneral {
  constructor(private readonly specieService: SpecieService) {}

  async execute(): Promise<TopSpeciesByAppointments> {
    return await this.specieService.getTopSpeciesGeneral()
  }
}
