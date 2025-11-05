import type { Animal,AnimalByClient,AnimalList,AnimalRequest } from "../models/Animal";
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchAnimalParams } from '../models/SearchAnimalParams'

export interface AnimalService{
  getAllAnimals():Promise<Animal[]>;
  getAnimalById(animalId:number):Promise<Animal>;
  getAnimalByClientId(clientId:number):Promise<AnimalByClient[]>;
  createAnimal(animalRequest:AnimalRequest):Promise<void>;
  updateAnimal(animalId:number,animalRequest:AnimalRequest):Promise<void>;
  deleteAnimal(animalId:number):Promise<void>
  activateAnimal(animalId:number):Promise<void>;
  searchAnimals(params: SearchAnimalParams): Promise<PageResponse<AnimalList>>;
updateAnimalWeight(id: number, weight: number): Promise<{ name: string; weight: number }>
}
