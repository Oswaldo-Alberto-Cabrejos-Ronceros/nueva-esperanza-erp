import { CreateHeadquarterVetService } from '@/services/HeadquarterVetService/application/CreateHeadquarterVetService'
import { DeleteHeadquarterVetService } from '@/services/HeadquarterVetService/application/DeleteHeadquarterVetService'
import { EnableHeadquarterVetService } from '@/services/HeadquarterVetService/application/EnableHeadquarterVetService'
import { FilterHeadquarterVetServices } from '@/services/HeadquarterVetService/application/FilterHeadquarterVetServices'
import { GetAllHeadquarterVetService } from '@/services/HeadquarterVetService/application/GetAllHeadquarterVetService'
import { GetAllHeadquarterVetServiceByHeadquarter } from '@/services/HeadquarterVetService/application/GetAllHeadquarterVetServiceByHeadquarter'
import { GetHeadquarterVetServiceByHeadquarter } from '@/services/HeadquarterVetService/application/GetHeadquarterVetServiceByHeadquarter'
import { GetHeadquarterVetServiceById } from '@/services/HeadquarterVetService/application/GetHeadquarterVetServiceById'
import { ListVeterinariansByHeadVetService } from '@/services/HeadquarterVetService/application/ListVeterinariansByHeadVetService'
import { UpdateHeadquarterVetService } from '@/services/HeadquarterVetService/application/UpdateHeadquarterVetService'
import { UpdateSimultaneousCapacity } from '@/services/HeadquarterVetService/application/UpdateSimultaneousCapacity'

import { HeadquarterVetServiceServiceImpl } from '@/services/HeadquarterVetService/infrastructure/HeadquarterVetServiceServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'

// Instanciar AxiosHttpClient
const axiosHttpClient = new AxiosHttpClient()

// Instanciar implementación del servicio
const headquarterVetService = new HeadquarterVetServiceServiceImpl(axiosHttpClient)

// Exponer los casos de uso
export const headquarterVetServiceUsesCases = {
  createHeadquarterVetService: new CreateHeadquarterVetService(headquarterVetService),
  deleteHeadquarterVetService: new DeleteHeadquarterVetService(headquarterVetService),
  getAllHeadquarterVetService: new GetAllHeadquarterVetService(headquarterVetService),
  getHeadquarterVetServiceByHeadquarter: new GetHeadquarterVetServiceByHeadquarter(
    headquarterVetService,
  ),
  getAllHeadquarterVetServiceByHeadquarter: new GetAllHeadquarterVetServiceByHeadquarter(
    headquarterVetService,
  ),
  getHeadquarterVetServiceById: new GetHeadquarterVetServiceById(headquarterVetService),
  listVeterinariansByHeadVetService: new ListVeterinariansByHeadVetService(headquarterVetService),
  updateHeadquarterVetService: new UpdateHeadquarterVetService(headquarterVetService),
  enableHeadquarterVetService: new EnableHeadquarterVetService(headquarterVetService),
  updateSimultaneousCapacity: new UpdateSimultaneousCapacity(headquarterVetService),
  filterHeadquarterVetServices: new FilterHeadquarterVetServices(headquarterVetService),
}
