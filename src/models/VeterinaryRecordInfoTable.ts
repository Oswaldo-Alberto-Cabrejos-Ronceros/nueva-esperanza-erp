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
