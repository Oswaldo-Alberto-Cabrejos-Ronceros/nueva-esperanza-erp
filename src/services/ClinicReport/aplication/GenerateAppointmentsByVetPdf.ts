import type { ClinicReportService } from '../domain/services/ClinicReportService'

export class GenerateAppointmentsByVetPdf {
  constructor(private readonly service: ClinicReportService) {}

  async execute(): Promise<Blob> {
    return await this.service.generateAppointmentsByVetPdf()
  }
}
