import type { VeterinaryRecord } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { VeterinaryRecord as VeterinaryRecordView } from '@/models/VeterinaryRecord'
import type { VeterinaryRecordInfoTable } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { VeterinaryRecordInfoTable as VeterinaryRecordInfoTableView } from '@/models/VeterinaryRecordInfoTable'
import type { VeterinaryRecordRequest } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import { DateAdapter } from './DateAdapter'
import type { RecentMedicalRecord as RecentMedicalRecordView } from '@/models/RecentMedicalRecord'
import type { RecentMedicalRecord } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import { FormatAdapter } from './FormatAdapter'

export class VeterinaryRecordAdapter {
  static toVeterinaryRecordView(veterinaryRecord: VeterinaryRecord): VeterinaryRecordView {
    return {
      id: veterinaryRecord.id,
      careId: veterinaryRecord.careId,
      employeeId: veterinaryRecord.employeeId,
      date: veterinaryRecord.dateCreate,
      diagnosis: veterinaryRecord.diagnosis,
      treatment: veterinaryRecord.treatment,
      observation: veterinaryRecord.observation,
      resultUrl: veterinaryRecord.resultUrl,
      status: veterinaryRecord.statusVeterinaryRecord,
    }
  }
  static fromVetRecordInfoTableToVetRecorIndoTableView(
    veterinaryRecordInfo: VeterinaryRecordInfoTable,
  ): VeterinaryRecordInfoTableView {
    return {
      id: veterinaryRecordInfo.id,
      date: veterinaryRecordInfo.date,
      nameHeadquarter: veterinaryRecordInfo.nameHeadquarter,
      nameEmployee: veterinaryRecordInfo.nameEmployee,
      diagnosis: veterinaryRecordInfo.diagnosis,
      treatment: veterinaryRecordInfo.treatment,
      observation: veterinaryRecordInfo.observation,
      resultUrl: veterinaryRecordInfo.resultUrl,
      status: FormatAdapter.toCaptalizeCaseWithout_(veterinaryRecordInfo.status),
    }
  }

  static fromSchemaToVeterinaryRecordRequest(schema: FormValues): VeterinaryRecordRequest {
    return {
      careId: schema.careId,
      employeeId: schema.employeeId,
      dateCreate: DateAdapter.toDateYYYYmmDD(schema.dateCreate),
      diagnosis: schema.diagnosis,
      treatment: schema.treatment,
      observation: schema.observation,
      resultUrl: schema.resultUrl ?? undefined,
    }
  }

  static toRecentMedicalRecordView(record: RecentMedicalRecord): RecentMedicalRecordView {
    return {
      id: record.veterinaryRecordId,
      careId: record.careId,
      petName: record.animalName,
      petId:record.animalId,
      breedName: record.breedName,
      clientFullName: record.clientFullName,
      serviceName: record.serviceName,
      recordMedicalDate: record.recordMedicalDate,
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      observations: record.observations,
      status: FormatAdapter.toCaptalizeCaseWithout_(record.status),
    }
  }
}
