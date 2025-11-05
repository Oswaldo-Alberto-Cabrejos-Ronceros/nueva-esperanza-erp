import type { HeadquarterVetServiceRequest } from "../domain/models/HeadquarterVetService";
import type { HeadquarterVetServiceService } from "../domain/services/HeadquarterVetServiceService";

export class UpdateHeadquarterVetService{
    constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}

    async execute(id: number, request: HeadquarterVetServiceRequest){
      return this.headquarterVetService.update(id,request)
    }

}
