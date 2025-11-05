import { CreateBreed } from '@/services/Breed/aplication/CreateBreed'
import { DeleteBreed } from '@/services/Breed/aplication/DeleteBreed'
import { GetAllBreeds } from '@/services/Breed/aplication/GetAllBreeds'
import { GetBreedById } from '@/services/Breed/aplication/GetBreedById'
import { GetBreedsBySpecie } from '@/services/Breed/aplication/GetBreedsBySpecie'
import { UpdateBreed } from '@/services/Breed/aplication/UpdateBreed'
import { ActivateBreed } from '@/services/Breed/aplication/ActivateBreed'
import { BreedServiceImpl } from '@/services/Breed/infrastructure/BreedServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { SearchBreeds } from '@/services/Breed/aplication/SearchBreeds'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const breedService = new BreedServiceImpl(axiosHttpClient)

//exporse uses cases

export const breedUsesCases = {
  //inject dependency
  createBreed: new CreateBreed(breedService),
  deleteBreed: new DeleteBreed(breedService),
  getAllBreeds: new GetAllBreeds(breedService),
  getBreedById: new GetBreedById(breedService),
  getBreedsBySpecie: new GetBreedsBySpecie(breedService),
  updateBreed: new UpdateBreed(breedService),
  activateBreed: new ActivateBreed(breedService),
  searchBreeds: new SearchBreeds(breedService),
}
