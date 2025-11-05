import type { PageResponse } from '@/services/models/PageResponse'
import type { RecentMedicalRecord, VeterinaryRecord, VeterinaryRecordInfoTable, VeterinaryRecordRequest, VeterinaryRecordStats } from '../models/VeterinaryRecord'

export interface VeterinaryRecordService {
  create(veterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord>
  update(id: number, eterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord>
  findAll(): Promise<VeterinaryRecord[]>
  findById(id: number): Promise<VeterinaryRecord>
  setEnCurso(id: number): Promise<VeterinaryRecord>
  setCompletado(id: number): Promise<VeterinaryRecord>
  setObservacion(id: number): Promise<VeterinaryRecord>
  getAllInfoVeterinaryRecordsByAnimal(
    animalId: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<VeterinaryRecordInfoTable>>
  getRecentRecordsByEmployee(employeeId: number): Promise<RecentMedicalRecord[]>
getStatsByVeterinarian(employeeId: number): Promise<VeterinaryRecordStats>
getRecordsByAnimalId(animalId: number): Promise<VeterinaryRecordInfoTable[]>
}
