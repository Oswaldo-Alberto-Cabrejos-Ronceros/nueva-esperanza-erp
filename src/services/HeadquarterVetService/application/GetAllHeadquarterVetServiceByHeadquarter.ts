import type { HeadquarterVetService } from "../domain/models/HeadquarterVetService";
import type { HeadquarterVetServiceService } from "../domain/services/HeadquarterVetServiceService";

export class GetAllHeadquarterVetServiceByHeadquarter {
  constructor(private readonly service: HeadquarterVetServiceService) {}

  execute(headquarterId: number): Promise<HeadquarterVetService[]> {
    return this.service.getAllHeadquarterVetServiceByHeadquarter(headquarterId)
  }
}
