import type { CaresByVetAndHeadquarter } from "../domain/models/CaresByVetAndHeadquarter";
import type { ClinicReportService } from "../domain/services/ClinicReportService";

export class GetCaresByVetAndHeadquarter {
  constructor(private readonly service: ClinicReportService) {}
  async execute(): Promise<CaresByVetAndHeadquarter[]> {
    return this.service.getCaresByVetAndHeadquarter()
  }
}
