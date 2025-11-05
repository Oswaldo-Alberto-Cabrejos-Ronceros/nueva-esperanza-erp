import { headquarterUsesCases } from '@/dependency-injection/headquarter.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Headquarter as HeadquarterView } from '@/models/Headquarter'
import type { Headquarter } from '@/services/Headquarter/domain/models/Headquarter'
import { HeadquarterAdapter } from '@/adapters/HeadquarterAdapter'
import type { FormValues as HeadquarterAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import type { HeadquarterList as HeadquarterListView } from '@/models/HeadquarterList'
import type { PageResponse } from '@/services/models/PageResponse'

export function useHeadquarter() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  //create

  const createHeadquarter = async (headquarterAddEditSchema: HeadquarterAddEditSchema) => {
    const headquarterRequest =
      HeadquarterAdapter.fromSchemaAddEditToHeadquarterRequest(headquarterAddEditSchema)

    const createHeadquarter = await runUseCase('createHeadquarter', () =>
      headquarterUsesCases.createHeadquarter.execute(headquarterRequest),
    )

    return HeadquarterAdapter.toHeadquarterView(createHeadquarter)
  }

  const deleteHeadquarter = async (headquarterId: number) => {
    await runUseCase('deleteHeadquarter', () =>
      headquarterUsesCases.deleteHeadquarter.execute(headquarterId),
    )
  }

  const getAllHeadquarters = async (): Promise<HeadquarterView[]> => {
    const headquarters: Headquarter[] = await runUseCase('getAllHeadquarters', () =>
      headquarterUsesCases.getAllHeadquarters.execute(),
    )
    //adapt
    return headquarters.map((headquarter) => HeadquarterAdapter.toHeadquarterView(headquarter))
  }

  const getHeadquarterById = async (headquarterId: number): Promise<HeadquarterView> => {
    const headquarter: Headquarter = await runUseCase('getHeadquarterById', () =>
      headquarterUsesCases.getHeadquarterById.execute(headquarterId),
    )
    return HeadquarterAdapter.toHeadquarterView(headquarter)
  }

  //update

  const updateHeadquarter = async (
    headquarterId: number,
    headquarterAddEditSchema: HeadquarterAddEditSchema,
  ) => {
    const headquarterRequest =
      HeadquarterAdapter.fromSchemaAddEditToHeadquarterRequest(headquarterAddEditSchema)
    const headquarter: Headquarter = await runUseCase('updateHeadquarter', () =>
      headquarterUsesCases.updateHeadquarter.execute(headquarterId, headquarterRequest),
    )
    return HeadquarterAdapter.toHeadquarterView(headquarter)
  }

  const activateHeadquarter = async (headquarterId: number) => {
    await runUseCase('activateHeadquarter', () =>
      headquarterUsesCases.activateHeadquarter.execute(headquarterId),
    )
  }

  const searchHeadquarters = async (
    page: number,
    size: number,
    name?: string,
    phone?: string,
    address?: string,
    email?: string,
    district?: string,
    province?: string,
    status?: boolean,
  ): Promise<PageResponse<HeadquarterListView>> => {
    const pageHeadquarter = await runUseCase('searchHeadquarters', () =>
      headquarterUsesCases.searchHeadquarters.execute(
        page,
        size,
        name,
        phone,
        address,
        email,
        district,
        province,
        status,
      ),
    )
    const headquarterView = pageHeadquarter.content.map((headquarter) =>
      HeadquarterAdapter.fromHeadquarterListToHeadquarterListView(headquarter),
    )

    return {
      ...pageHeadquarter,
      content: headquarterView,
    }
  }

  return {
    loading,
    error,
    deleteHeadquarter,
    getAllHeadquarters,
    getHeadquarterById,
    createHeadquarter,
    updateHeadquarter,
    activateHeadquarter,
    searchHeadquarters,
  }
}
