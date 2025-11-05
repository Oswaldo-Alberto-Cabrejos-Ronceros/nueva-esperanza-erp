import { specieUsesCases } from '@/dependency-injection/specie.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Specie } from '@/services/Specie/domain/models/Specie'
import { SpecieAdapter } from '@/adapters/SpecieAdapter'
import type { Specie as SpecieView } from '@/models/Specie'
import type { FormValues as SpecieAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-specie'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SpecieList as SpecieListView } from '@/models/SpecieList'
import type { ReportPeriod } from '@/services/enums/ReportPeriod'

export function useSpecie() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  //create

  const createSpecie = async (schemaAddEdit: SpecieAddEditSchema): Promise<SpecieView> => {
    const specieRequest = SpecieAdapter.fromSchemaAddEditToSpecieRequest(schemaAddEdit)
    const specie = await runUseCase('createSpecie', () =>
      specieUsesCases.createSpecie.execute(specieRequest),
    )
    return SpecieAdapter.toSpecieView(specie)
  }

  const deleteSpecie = async (specieId: number) => {
    await runUseCase('deleteSpecie', () => specieUsesCases.deleteSpecie.execute(specieId))
  }

  const getAllSpecies = async (): Promise<SpecieView[]> => {
    const species: Specie[] = await runUseCase('getAllSpecies', () =>
      specieUsesCases.getAllSpecies.execute(),
    )
    //adapt
    return species.map((specie) => SpecieAdapter.toSpecieView(specie))
  }

  const getSpecieById = async (specieId: number): Promise<SpecieView> => {
    const specie: Specie = await runUseCase('getSpecieById', () =>
      specieUsesCases.getSpecieById.execute(specieId),
    )
    return SpecieAdapter.toSpecieView(specie)
  }

  //update
  const updateSpecie = async (
    specieId: number,
    schemaAddEdit: SpecieAddEditSchema,
  ): Promise<SpecieView> => {
    const specieRequest = SpecieAdapter.fromSchemaAddEditToSpecieRequest(schemaAddEdit)
    const specie: Specie = await runUseCase('updateSpecie', () =>
      specieUsesCases.updateSpecie.execute(specieId, specieRequest),
    )
    return SpecieAdapter.toSpecieView(specie)
  }

  const activateSpecie = async (specieId: number): Promise<void> => {
    await runUseCase('activateSpecie', () => specieUsesCases.activateSpecie.execute(specieId))
  }

  const searchSpecies = async (
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<SpecieListView>> => {
    const result = await runUseCase('searchSpecies', () =>
      specieUsesCases.searchSpecies.execute(page, size, name, status),
    )
    return {
      ...result,
      content: result.content.map(SpecieAdapter.fromSpecieListToSpecieListView),
    }
  }

  const getTopSpeciesGeneral = async () => {
    return await runUseCase('getTopSpeciesGeneral', () =>
      specieUsesCases.getTopSpeciesGeneral.execute(),
    )
  }

  const getTopSpeciesByHeadquarter = async (headquarterId: number) => {
    return await runUseCase('getTopSpeciesByHeadquarter', () =>
      specieUsesCases.getTopSpeciesGeneralByHeadquarter.execute(headquarterId),
    )
  }

  const getTopSpeciesByPeriod = async (period: ReportPeriod) => {
    return await runUseCase('getTopSpeciesByPeriod', () =>
      specieUsesCases.getTopSpeciesByPeriod.execute(period),
    )
  }

  const getTopSpeciesByPeriodAndHeadquarter = async (
    period: ReportPeriod,
    headquarterId: number,
  ) => {
    return await runUseCase('getTopSpeciesByPeriodAndHeadquarter', () =>
      specieUsesCases.getTopSpeciesByPeriodAndHeadquarter.execute(period, headquarterId),
    )
  }

  return {
    loading,
    error,
    createSpecie,
    deleteSpecie,
    getAllSpecies,
    getSpecieById,
    updateSpecie,
    activateSpecie,
    searchSpecies,
    getTopSpeciesGeneral,
    getTopSpeciesByHeadquarter,
    getTopSpeciesByPeriod,
    getTopSpeciesByPeriodAndHeadquarter,
  }
}
