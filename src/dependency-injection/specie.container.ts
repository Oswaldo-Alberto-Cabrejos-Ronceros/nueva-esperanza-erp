import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreateSpecie } from '@/services/Specie/aplication/CreateSpecie'
import { DeleteSpecie } from '@/services/Specie/aplication/DeleteSpecie'
import { GetAllSpecies } from '@/services/Specie/aplication/GetAllSpecies'
import { GetSpecieById } from '@/services/Specie/aplication/GetSpecieById'
import { UpdateSpecie } from '@/services/Specie/aplication/UpdateSpecie'
import { ActivateSpecie } from '@/services/Specie/aplication/ActivateSpecie'
import { SearchSpecies } from '@/services/Specie/aplication/SearchSpecies'
import { SpecieServiceImpl } from '@/services/Specie/infrastructure/SpecieServiceImpl'
import { GetTopSpeciesGeneral } from '@/services/Specie/aplication/GetTopSpeciesGeneral'
import { GetTopSpeciesByHeadquarter } from '@/services/Specie/aplication/GetTopSpeciesByHeadquarter'
import { GetTopSpeciesByPeriod } from '@/services/Specie/aplication/GetTopSpeciesByPeriod'
import { GetTopSpeciesByPeriodAndHeadquarter } from '@/services/Specie/aplication/GetTopSpeciesByPeriodAndHeadquarter'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const specieService = new SpecieServiceImpl(axiosHttpClient)

//expose uses cases

export const specieUsesCases = {
  //inject dependency
  createSpecie: new CreateSpecie(specieService),
  deleteSpecie: new DeleteSpecie(specieService),
  getAllSpecies: new GetAllSpecies(specieService),
  getSpecieById: new GetSpecieById(specieService),
  updateSpecie: new UpdateSpecie(specieService),
  activateSpecie: new ActivateSpecie(specieService),
  searchSpecies: new SearchSpecies(specieService),
  getTopSpeciesGeneral: new GetTopSpeciesGeneral(specieService),
  getTopSpeciesGeneralByHeadquarter: new GetTopSpeciesByHeadquarter(specieService),
  getTopSpeciesByPeriod: new GetTopSpeciesByPeriod(specieService),
  getTopSpeciesByPeriodAndHeadquarter: new GetTopSpeciesByPeriodAndHeadquarter(specieService),
}
