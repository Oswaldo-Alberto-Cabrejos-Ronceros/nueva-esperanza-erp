import type { VeterinaryRecordStats } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import { useAsyncHandler } from './useAsyncHandler'
import { veterinaryRecordUsesCases } from '@/dependency-injection/veterinary-record.container'
import { VeterinaryRecordAdapter } from '@/adapters/VeterinaryRecordAdapter'
import type { FormValues as SchemaAddEditVeterinaryRecord } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import type { RecentMedicalRecord as RecentMedicalRecordView } from '@/models/RecentMedicalRecord'
import type { VeterinaryRecordInfoTable as VeterinaryRecordInfoTableView } from '@/models/VeterinaryRecordInfoTable'

export function useVeterinaryRecord() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const createVeterinaryRecord = async (schemaVeterinaryRecord: SchemaAddEditVeterinaryRecord) => {
    const request =
      VeterinaryRecordAdapter.fromSchemaToVeterinaryRecordRequest(schemaVeterinaryRecord)
    const veterinaryRecord = await runUseCase('createVeterinaryRecord', () =>
      veterinaryRecordUsesCases.createVeterinaryRecord.execute(request),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const findAllVeterinaryRecord = async () => {
    const veterinaryRecords = await runUseCase('findAllVeterinaryRecord', () =>
      veterinaryRecordUsesCases.findAllVeterinaryRecord.execute(),
    )
    return veterinaryRecords.map((veterinaryRecord) =>
      VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord),
    )
  }

  const findVeterinaryRecordById = async (id: number) => {
    const veterinaryRecord = await runUseCase('findVeterinaryRecordById', () =>
      veterinaryRecordUsesCases.findVeterinaryRecordById.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const getAllInfoVeterinaryRecordsByPet = async (petId: number, page?: number, size?: number) => {
    const pageVeterinaryRecords = await runUseCase('getAllInfoVeterinaryRecordsByPet', () =>
      veterinaryRecordUsesCases.getAllInfoVeterinaryRecordsByAnimal.execute(petId, page, size),
    )

    const content = pageVeterinaryRecords.content.map((veterinaryRecord) =>
      VeterinaryRecordAdapter.fromVetRecordInfoTableToVetRecorIndoTableView(veterinaryRecord),
    )
    return {
      ...pageVeterinaryRecords,
      content,
    }
  }

  const updateVeterinaryRecord = async (
    id: number,
    schemaVeterinaryRecord: SchemaAddEditVeterinaryRecord,
  ) => {
    const request =
      VeterinaryRecordAdapter.fromSchemaToVeterinaryRecordRequest(schemaVeterinaryRecord)
    const veterinaryRecord = await runUseCase('updateVeterinaryRecord', () =>
      veterinaryRecordUsesCases.updateVeterinaryRecord.execute(id, request),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordCompletado = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordCompletado', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordCompletado.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordEnCurso = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordEnCurso', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordEnCurso.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordObservacion = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordObservacion', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordObservacion.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const getRecentRecordsByEmployee = async (
    employeeId: number,
  ): Promise<RecentMedicalRecordView[]> => {
    const records = await runUseCase('getRecentRecordsByEmployee', () =>
      veterinaryRecordUsesCases.getRecentRecordsByEmployee.execute(employeeId),
    )
    return records.map(VeterinaryRecordAdapter.toRecentMedicalRecordView)
  }

  const getStatsByVeterinarian = async (employeeId: number): Promise<VeterinaryRecordStats> => {
    const stats = await runUseCase('getStatsByVeterinarian', () =>
      veterinaryRecordUsesCases.getStatsByVeterinarian.execute(employeeId),
    )
    return stats
  }

  const getRecordsByAnimalId = async (
    animalId: number,
  ): Promise<VeterinaryRecordInfoTableView[]> => {
    const records = await runUseCase('getRecordsByAnimalId', () =>
      veterinaryRecordUsesCases.getRecordsByAnimalId.execute(animalId),
    )
    return records.map((v) =>
      VeterinaryRecordAdapter.fromVetRecordInfoTableToVetRecorIndoTableView(v),
    )
  }

  return {
    loading,
    error,
    createVeterinaryRecord,
    findAllVeterinaryRecord,
    findVeterinaryRecordById,
    getAllInfoVeterinaryRecordsByPet,
    updateVeterinaryRecord,
    setVeterinaryRecordCompletado,
    setVeterinaryRecordEnCurso,
    setVeterinaryRecordObservacion,
    getRecentRecordsByEmployee,
    getStatsByVeterinarian,
    getRecordsByAnimalId,
  }
}
