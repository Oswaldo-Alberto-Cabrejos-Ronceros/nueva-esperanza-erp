import { CreateVeterinaryRecord } from '@/services/VeterinaryRecord/application/CreateVeterinaryRecord'
import { FindAllVeterinaryRecord } from '@/services/VeterinaryRecord/application/FindAllVeterinaryRecord'
import { FindVeterinaryRecordById } from '@/services/VeterinaryRecord/application/FindVeterinaryRecordById'
import { GetAllInfoVeterinaryRecordsByAnimal } from '@/services/VeterinaryRecord/application/GetAllInfoVeterinaryRecordsByAnimal'
import { UpdateVeterinaryRecord } from '@/services/VeterinaryRecord/application/UpdateVeterinaryRecord'
import { VeterinaryRecordSetCompletado } from '@/services/VeterinaryRecord/application/VeterinaryRecordSetCompletado'
import { VeterinaryRecordSetEnCurso } from '@/services/VeterinaryRecord/application/VeterinaryRecordSetEnCurso'
import { VeterinaryRecordSetObservacion } from '@/services/VeterinaryRecord/application/VeterinaryRecordSetObservacion'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { VeterinaryRecordServiceImpl } from '@/services/VeterinaryRecord/infrastructure/VeterinaryRecordServiceImpl'
import { GetRecentRecordsByEmployee } from '@/services/VeterinaryRecord/application/GetRecentRecordsByEmployee'
import { GetVeterinaryRecordStatsByVeterinarian } from '@/services/VeterinaryRecord/application/GetVeterinaryRecordStatsByVeterinarian'
import { GetRecordsByAnimalId } from '@/services/VeterinaryRecord/application/GetRecordsByAnimalId'

const axiosHttpClient = new AxiosHttpClient()
const veterinaryRecordService = new VeterinaryRecordServiceImpl(axiosHttpClient)

export const veterinaryRecordUsesCases = {
  createVeterinaryRecord: new CreateVeterinaryRecord(veterinaryRecordService),
  findAllVeterinaryRecord: new FindAllVeterinaryRecord(veterinaryRecordService),
  findVeterinaryRecordById: new FindVeterinaryRecordById(veterinaryRecordService),
  getAllInfoVeterinaryRecordsByAnimal: new GetAllInfoVeterinaryRecordsByAnimal(
    veterinaryRecordService,
  ),
  updateVeterinaryRecord: new UpdateVeterinaryRecord(veterinaryRecordService),
  setVeterinaryRecordCompletado: new VeterinaryRecordSetCompletado(veterinaryRecordService),
  setVeterinaryRecordEnCurso: new VeterinaryRecordSetEnCurso(veterinaryRecordService),
  setVeterinaryRecordObservacion: new VeterinaryRecordSetObservacion(veterinaryRecordService),
  getRecentRecordsByEmployee: new GetRecentRecordsByEmployee(veterinaryRecordService),
  getStatsByVeterinarian: new GetVeterinaryRecordStatsByVeterinarian(veterinaryRecordService),
  getRecordsByAnimalId: new GetRecordsByAnimalId(veterinaryRecordService),
}
