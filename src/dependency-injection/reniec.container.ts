import { ReniecServiceImpl } from '@/services/Reniec/infrastructure/ReniecServiceImpl'
import { GetInfoSimpleByReniec } from '@/services/Reniec/aplication/GetInfoSimpleByReniec'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'

//instantiete AciosHttpClient
const axiosHttpClient = new AxiosHttpClient()
const reniecService = new ReniecServiceImpl(axiosHttpClient)

//expose use cases

export const reniecUsesCases = {
  //inject dependency
  getInfoSimpleByReniec: new GetInfoSimpleByReniec(reniecService),
}
