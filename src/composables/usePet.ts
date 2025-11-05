import { animalUsesCases } from '@/dependency-injection/animal.container'
import { useAsyncHandler } from './useAsyncHandler'
import { AnimalAdapter } from '@/adapters/AnimalAdapter'
import type {
  Animal,
  AnimalByClient,
  AnimalList,
  AnimalRequest,
} from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'
import type { FormValues as PetAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import type { PetByClient } from '@/models/PetByClient'
import type { FormValues as AddMyPetSchema } from '@/validation-schemas-forms/schema-add-pet-client'
import type { SearchAnimalParams } from '@/services/Animal/domain/models/SearchAnimalParams'
import type { PageResponse } from '@/services/models/PageResponse'
import type { PetList } from '@/models/PetList'
export function usePet() {
  const { loading, error, runUseCase } = useAsyncHandler()

  //create

  const createPet = async (petAddEditSchema: PetAddEditSchema) => {
    const animalRequest = AnimalAdapter.fromSchemaAddEditToPetRequest(petAddEditSchema)
    await runUseCase('createPet', () => animalUsesCases.createAnimal.execute(animalRequest))
  }

  const createPetClient = async (addMyPetSchema: AddMyPetSchema, clientId: number) => {
    const animalRequest: AnimalRequest = AnimalAdapter.fromAddMyPetSchemaToAnimalRequest(
      addMyPetSchema,
      clientId,
    )
    await runUseCase('createPetClient', () => animalUsesCases.createAnimal.execute(animalRequest))
  }

  const deletePet = async (petId: number): Promise<void> => {
    await runUseCase('deletePet', () => animalUsesCases.deleteAnimal.execute(petId))
  }

  const getAllPets = async (): Promise<PetView[]> => {
    const animals: Animal[] = await runUseCase('getAllPets', () =>
      animalUsesCases.getAllAnimals.execute(),
    )
    return animals.map((animal) => AnimalAdapter.toPetView(animal))
  }

  const getPetByClientId = async (clientId: number): Promise<PetByClient[]> => {
    const animals: AnimalByClient[] = await runUseCase('getPetByClientId', () =>
      animalUsesCases.getAnimalByClientId.execute(clientId),
    )
    //adapt
    return animals.map((animal) => AnimalAdapter.fromAnimalByClientToPetByClient(animal))
  }

  const getPetById = async (petId: number): Promise<PetView> => {
    const animal: Animal = await runUseCase('getPetById', () =>
      animalUsesCases.getAnimalById.execute(petId),
    )
    return AnimalAdapter.toPetView(animal)
  }

  //update

  const updatePet = async (petId: number, petAddEditSchema: PetAddEditSchema) => {
    const animalRequest = AnimalAdapter.fromSchemaAddEditToPetRequest(petAddEditSchema)
    await runUseCase('updatePet', () => animalUsesCases.updateAnimal.execute(petId, animalRequest))
  }

  const activatePet = async (petId: number): Promise<void> => {
    await runUseCase('activatePet', () => animalUsesCases.activateAnimal.execute(petId))
  }

  const searchPets = async (params: SearchAnimalParams): Promise<PageResponse<PetList>> => {
    const page: PageResponse<AnimalList> = await runUseCase('searchAnimals', () =>
      animalUsesCases.searchAnimals.execute(params),
    )

    return {
      ...page,
      content: page.content.map((animal) => AnimalAdapter.fromAnimalListToPetList(animal)),
    }
  }

  const updatePetWeight = async (id: number, weight: number): Promise<{ name: string; weight: number }> => {
  return await runUseCase('updateAnimalWeight', () =>
    animalUsesCases.updateAnimalWeight.execute(id, weight),
  )
}


  return {
    loading,
    error,
    createPet,
    createPetClient,
    deletePet,
    getAllPets,
    getPetByClientId,
    getPetById,
    updatePet,
    activatePet,
    searchPets,
    updatePetWeight
  }
}
