import type { CareRequestCreate } from "../domain/models/Care";
import type { CareService } from "../domain/services/CareService";

export class CreateCareFromRequest{
    constructor(private readonly careService:CareService){}
    async execute(careRequest: CareRequestCreate){
      return await this.careService.createCareFromRequest(careRequest)
    }
}
