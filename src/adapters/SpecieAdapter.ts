import type { Specie, SpecieRequest, SpecieList } from '@/services/Specie/domain/models/Specie'
import type { Specie as SpecieView } from '@/models/Specie'
import type { FormValues as SpecieAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-specie'
import type { SpecieList as SpecieListDTO } from '@/services/Specie/domain/models/Specie'
import type { SpecieList as SpecieListView } from '@/models/SpecieList'

export class SpecieAdapter {
  static toSpecieViewFromList(specie: SpecieList): SpecieView {
    return {
      id: specie.specieId,
      name: specie.name,
      imagePath: '',
    }
  }
  static toSpecieView(specie: Specie): SpecieView {
    return {
      id: specie.specieId,
      name: specie.name,
      imagePath: specie.imagePath,
    }
  }
  //para adaptar de schema a SpecieRequest
  static fromSchemaAddEditToSpecieRequest(schemaAddEdit: SpecieAddEditSchema): SpecieRequest {
    return {
      name: schemaAddEdit.name,
      imagePath: schemaAddEdit.imagePath,
    }
  }
  static fromSpecieListToSpecieListView(specie: SpecieListDTO): SpecieListView {
    return {
      id: specie.specieId,
      name: specie.name,
      status: specie.status,
    }
  }
}
