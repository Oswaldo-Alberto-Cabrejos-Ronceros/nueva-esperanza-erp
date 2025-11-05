import { ReniecAdapter } from '@/adapters/ReniecAdapter'
import { reniecUsesCases } from '@/dependency-injection/reniec.container'
import type { BasicInfoByReniec } from '@/models/BasicInfoByReniec'
import { useAsyncHandler } from './useAsyncHandler'

export function useReniec() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getInfoSimpleByReniec = async (dni: string): Promise<BasicInfoByReniec> => {
    const info = await runUseCase('getInfoSimpleByReniec', () =>
      reniecUsesCases.getInfoSimpleByReniec.execute(dni),
    )
    return ReniecAdapter.reniecResponseSimpleToBasicInfoByReniec(info)
  }

  return {
    loading,
    error,
    getInfoSimpleByReniec,
  }
}
