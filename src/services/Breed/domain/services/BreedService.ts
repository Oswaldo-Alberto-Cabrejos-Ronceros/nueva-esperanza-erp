import type { Breed, BreedList } from '../models/Breed'
import type { BreedRequest } from '../models/Breed'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchBreedParams } from '../models/SearchBreedParams'

export interface BreedService {
  getBreedById(breedId: number): Promise<Breed>
  getAllBreeds(): Promise<Breed[]>
  getBreedsBySpecie(specieId: number): Promise<Breed[]>
  createBreed(breedRequest: BreedRequest): Promise<Breed>
  updateBreed(breedId: number, breedRequest: BreedRequest): Promise<Breed>
  deleteBreed(breedId: number): Promise<void>
  activateBreed(breedId: number): Promise<void>
  searchBreeds(params: SearchBreedParams): Promise<PageResponse<BreedList>>
}

