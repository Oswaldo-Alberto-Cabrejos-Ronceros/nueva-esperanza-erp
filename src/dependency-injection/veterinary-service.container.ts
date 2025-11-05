import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreateVeterinaryService } from '@/services/VeterinaryService/aplication/CreateVeterinaryService'
import { DeleteVeterinaryService } from '@/services/VeterinaryService/aplication/DeleteVeterinaryService'
import { GetAllVeterinaryServices } from '@/services/VeterinaryService/aplication/GetAllVeterinaryService'
import { GetVeterinaryServiceById } from '@/services/VeterinaryService/aplication/GetVeterinaryServiceById'
import { UpdateVeterinaryService } from '@/services/VeterinaryService/aplication/UpdateVeterinaryService'
import { ActivateVeterinaryService } from '@/services/VeterinaryService/aplication/ActivateVeterinaryService'
import { SearchVeterinaryServices } from '@/services/VeterinaryService/aplication/SearchVeterinaryServices'
import { VeterinaryServiceServiceImpl } from '@/services/VeterinaryService/infrastructure/VeterinaryServiceServiceImpl'
import { GetTopServicesForAdmin } from '@/services/VeterinaryService/aplication/GetTopServicesForAdmin'
import { GetTopServicesForManager } from '@/services/VeterinaryService/aplication/GetTopServicesForManager'

const axiosHttpClient = new AxiosHttpClient()
const veterinaryServiceService = new VeterinaryServiceServiceImpl(axiosHttpClient)

export const veterinaryServiceUsesCases = {
  createVeterinaryService: new CreateVeterinaryService(veterinaryServiceService),
  deleteVeterinaryService: new DeleteVeterinaryService(veterinaryServiceService),
  getAllVeterinaryServices: new GetAllVeterinaryServices(veterinaryServiceService),
  getVeterinaryServiceById: new GetVeterinaryServiceById(veterinaryServiceService),
  updateVeterinaryService: new UpdateVeterinaryService(veterinaryServiceService),
  activateVeterinaryService: new ActivateVeterinaryService(veterinaryServiceService),
  searchVeterinaryServices: new SearchVeterinaryServices(veterinaryServiceService),
  getTopServicesForAdmin: new GetTopServicesForAdmin(veterinaryServiceService),
  getTopServicesForManager: new GetTopServicesForManager(veterinaryServiceService),
}
