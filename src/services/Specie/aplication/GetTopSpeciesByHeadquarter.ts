import type { TopSpeciesByAppointments } from "../domain/models/Specie";
import type { SpecieService } from "../domain/services/SpecieService";

export class GetTopSpeciesByHeadquarter {
  constructor(private readonly specieService: SpecieService) {}

  async execute(headquarterId:number): Promise<TopSpeciesByAppointments> {
    return await this.specieService.getTopSpeciesByHeadquarter(headquarterId)
  }
}
