import type { Animal, AnimalRequest } from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'
import type { FormValues as PetAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import { DateAdapter } from './DateAdapter'
import type { AnimalByClient } from '@/services/Animal/domain/models/Animal'
import type { PetByClient } from '@/models/PetByClient'
import type { FormValues as AddMyPetSchema } from '@/validation-schemas-forms/schema-add-pet-client'
import type { AnimalList } from '@/services/Animal/domain/models/Animal'
import type { PetList } from '@/models/PetList'
import type { RecentPatient as RecentPatientView  } from '@/models/RecentPatient'
import type { RecentPatient } from '@/services/Care/domain/models/Care'

export class AnimalAdapter {
  static toPetView(animal: Animal): PetView {
    return {
      id: animal.animalId,
      name: animal.name,
      gender: animal.gender,
      weight: animal.weight,
      birthdate: animal.birthDate,
      comment: animal.animalComment,
      urlImage: animal.urlImage,
      specie: {
        id: animal.breed.specie.specieId,
        name: animal.breed.specie.name,
      },
      breed: {
        id: animal.breed.breedId,
        name: animal.breed.name,
      },
      clientId: animal.clientId,
    }
  }
  static fromSchemaAddEditToPetRequest(schemaAddEdit: PetAddEditSchema): AnimalRequest {
    return {
      name: schemaAddEdit.name,
      gender: schemaAddEdit.gender,
      weight: schemaAddEdit.weight,
      birthDate: schemaAddEdit.birthdate
        ? DateAdapter.toDateYYYYmmDD(schemaAddEdit.birthdate)
        : undefined,
      animalComment: schemaAddEdit.comment,
      urlImage: schemaAddEdit.urlImage,
      breed: {
        breedId: schemaAddEdit.breedId,
      },
      //fix
      clientId: schemaAddEdit.ownerId,
    }
  }
  static fromAnimalByClientToPetByClient(animalByClient: AnimalByClient): PetByClient {
    return {
      id: animalByClient.animalId,
      birthdate: animalByClient.birthDate,
      gender: animalByClient.gender,
      name: animalByClient.name,
      urlImage: animalByClient.urlImage,
      weight: animalByClient.weight,
      breedName: animalByClient.breedName,
      specieName: animalByClient.speciesName,
      specieId: animalByClient.speciesId,
      animalComment: animalByClient.animalComment,
    }
  }
  static fromAddMyPetSchemaToAnimalRequest(
    addMyPetSchema: AddMyPetSchema,
    clientId: number,
  ): AnimalRequest {
    return {
      name: addMyPetSchema.name,
      gender: addMyPetSchema.gender,
      birthDate: addMyPetSchema.birthdate
        ? DateAdapter.toDateYYYYmmDD(addMyPetSchema.birthdate)
        : undefined,
      breed: {
        breedId: addMyPetSchema.breedId,
      },
      clientId: clientId,
    }
  }

  static fromAnimalListToPetList(animalList: AnimalList): PetList {
    return {
      id: animalList.animalId,
      name: animalList.name,
      owner: animalList.owner,
      specie: animalList.specie,
      breed: animalList.breed,
      gender: animalList.gender,
      status: animalList.status,
    }
  }

  static toRecentPatientView(patient: RecentPatient): RecentPatientView {
    return {
      petId: patient.animalId,
      petName: patient.animalName,
      breedName: patient.breedName,
      clientFullName: patient.clientFullName,
      lastVisitDate: patient.lastVisitDate,
      petWeight: patient.animalWeight,
      petSex: patient.animalSex,
      petBirthdate: patient.animalBirthDate,
    }
  }
}
