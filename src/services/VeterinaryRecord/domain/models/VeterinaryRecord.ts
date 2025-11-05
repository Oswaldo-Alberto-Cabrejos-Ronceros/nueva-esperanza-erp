export interface VeterinaryRecord {
  id: number
  careId: number
  employeeId:number
  dateCreate: string
  diagnosis: string
  treatment: string
  observation: string
  resultUrl: string
  statusVeterinaryRecord: string
}

export interface VeterinaryRecordRequest {
  careId: number
  employeeId:number
  dateCreate: string
  diagnosis: string
  treatment: string
  observation: string
  resultUrl?: string
}

export interface VeterinaryRecordInfoTable {
  id: number
  date: string
  nameHeadquarter: string
  nameEmployee: string
  diagnosis: string
  treatment: string
  observation?: string
  resultUrl?: string
  status: string
}


export interface RecentMedicalRecord {
  veterinaryRecordId: number
  careId: number
  animalName: string
  breedName: string
  clientFullName: string
  serviceName: string
  recordMedicalDate: string
  diagnosis: string
  treatment: string
  observations: string
  status: string
  animalId:number
}

export interface VeterinaryRecordStats {
  total: number;
  enCurso: number;
  completado: number;
  observacion: number;
}
