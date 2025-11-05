//import use case
import { CreateAnimal } from '@/services/Animal/aplication/CreateAnimal'
import { DeleteAnimal } from '@/services/Animal/aplication/DeleteAnimal'
import { GetAllAnimals } from '@/services/Animal/aplication/GetAllAnimals'
import { GetAnimalByClientId } from '@/services/Animal/aplication/GetAnimalByClientId'
import { GetAnimalById } from '@/services/Animal/aplication/GetAnimalById'
import { UpdateAnimal } from '@/services/Animal/aplication/UpdateAnimal'
import { ActivateAnimal } from '@/services/Animal/aplication/ActivateAnimal'
import { SearchAnimals } from '@/services/Animal/aplication/SearchAnimals'
//import axiosHttpClient
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { AnimalServiceImpl } from '@/services/Animal/infraestructure/AnimalServiceImpl'
import { UpdateAnimalWeight } from '@/services/Animal/aplication/UpdateAnimalWeight'

//instantiete AciosHttpClient

const axiosHttpClient = new AxiosHttpClient()
//instantie service implementation
const animalService = new AnimalServiceImpl(axiosHttpClient)

//expose use cases

export const animalUsesCases = {
  //inject dependency
  createAnimal: new CreateAnimal(animalService),
  deleteAnimal: new DeleteAnimal(animalService),
  getAllAnimals: new GetAllAnimals(animalService),
  getAnimalByClientId: new GetAnimalByClientId(animalService),
  getAnimalById: new GetAnimalById(animalService),
  updateAnimal: new UpdateAnimal(animalService),
  activateAnimal: new ActivateAnimal(animalService),
  searchAnimals: new SearchAnimals(animalService),
  updateAnimalWeight: new UpdateAnimalWeight(animalService),
}
