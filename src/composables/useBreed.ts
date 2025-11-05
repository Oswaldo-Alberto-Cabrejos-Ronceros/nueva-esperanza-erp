import { breedUsesCases } from '@/dependency-injection/breed.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Breed } from '@/services/Breed/domain/models/Breed'
import type { Breed as BreedView } from '@/models/Breed'
import { BreedAdapter } from '@/adapters/BreedAdapter'
import type { FormValues as BreedAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import type { SearchBreedParams } from '@/services/Breed/domain/models/SearchBreedParams'
import type { PageResponse } from '@/services/models/PageResponse'
import type { BreedList as BreedListView } from '@/models/BreedList'

export function useBreed() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  //create
  const createBreed = async (schemaAddEdit: BreedAddEditSchema): Promise<BreedView> => {
    const breedRequest = BreedAdapter.fromSchemaAddEditToBreedRequest(schemaAddEdit)
    const breed = await runUseCase('createBreed', () =>
      breedUsesCases.createBreed.execute(breedRequest),
    )
    return BreedAdapter.toBreedView(breed)
  }

  const deleteBreed = async (breedId: number) => {
    await runUseCase('deleteBreed', () => breedUsesCases.deleteBreed.execute(breedId))
  }

  const getAllBreeds = async (): Promise<BreedView[]> => {
    const breeds: Breed[] = await runUseCase('getAllBreeds', () =>
      breedUsesCases.getAllBreeds.execute(),
    )
    return breeds.map((breed) => BreedAdapter.toBreedView(breed))
  }

  const getBreedByUd = async (breedId: number): Promise<BreedView> => {
    const breed: Breed = await runUseCase('getBreedByUd', () =>
      breedUsesCases.getBreedById.execute(breedId),
    )
    return BreedAdapter.toBreedView(breed)
  }

  const getBreedsBySpecie = async (specieId: number): Promise<BreedView[]> => {
    const breeds: Breed[] = await runUseCase('getBreedsBySpecie', () =>
      breedUsesCases.getBreedsBySpecie.execute(specieId),
    )
    return breeds.map((breed) => BreedAdapter.toBreedView(breed))
  }

  //update
  const updateBreed = async (
    breedId: number,
    schemaAddEdit: BreedAddEditSchema,
  ): Promise<BreedView> => {
    const breedRequest = BreedAdapter.fromSchemaAddEditToBreedRequest(schemaAddEdit)
    const breed = await runUseCase('updateBreed', () =>
      breedUsesCases.updateBreed.execute(breedId, breedRequest),
    )
    return BreedAdapter.toBreedView(breed)
  }

  const activateBreed = async (breedId: number): Promise<void> => {
    await runUseCase('activateBreed', () => breedUsesCases.activateBreed.execute(breedId))
  }

  const searchBreeds = async (
    params: SearchBreedParams,
  ): Promise<PageResponse<BreedListView>> => {
    const page = await runUseCase('searchBreeds', () =>
      breedUsesCases.searchBreeds.execute(params),
    )
    return {
      ...page,
      content: page.content.map((breed) =>
        BreedAdapter.fromBreedListToBreedListView(breed),
      ),
    }
  }

  return {
    loading,
    error,
    createBreed,
    deleteBreed,
    getAllBreeds,
    getBreedByUd,
    getBreedsBySpecie,
    updateBreed,
    activateBreed,
    searchBreeds,
  }
}
