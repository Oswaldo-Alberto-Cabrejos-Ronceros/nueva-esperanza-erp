import { reactive } from 'vue'
import { isAxiosError } from 'axios'
type LoadingState = Record<string, boolean>
type ErrorState = Record<string, string | null>

export function useAsyncHandler() {
  // for loading state
  const loading = reactive<LoadingState>({})
  //for error state
  const error = reactive<ErrorState>({})
  //higher orden fuction for run use case
  async function runUseCase<T>(name: string, fn: () => Promise<T>): Promise<T> {
    loading[name] = true
    error[name] = null
    try {
      const result = await fn()
      return result
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        error[name] = e.response?.data?.message || e.message || 'Error desconocido'
      } else if (e instanceof Error) {
        error[name] = e.message
      } else {
        error[name] = 'Ocurrió un error inesperado'
      }
      throw e
    } finally {
      loading[name] = false
    }
  }
  return { loading, error, runUseCase }
}
