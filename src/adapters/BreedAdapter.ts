import type { Breed, BreedRequest,BreedList } from '@/services/Breed/domain/models/Breed'
import type { Breed as BreedView } from '@/models/Breed'
import type { FormValues as BreedAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import type { BreedList as  BreedListView } from '@/models/BreedList'

export class BreedAdapter {
  static toBreedView(breed: Breed): BreedView {
    return {
      id: breed.breedId,
      name: breed.name,
      status: breed.status,
      specie: {
        id: breed.specie.specieId,
        name: breed.specie.name,
      },
    }
  }
  static fromSchemaAddEditToBreedRequest(schemaAddEdit: BreedAddEditSchema): BreedRequest {
    return {
      name: schemaAddEdit.name,
      specie: {
        specieId: schemaAddEdit.specieId,
      },
    }
  }
  static fromBreedListToBreedListView(breed: BreedList): BreedListView {
    return {
      id: breed.breedId,
      name: breed.name,
      specieName: breed.specieName,
      status: breed.status,
    }
  }
}
