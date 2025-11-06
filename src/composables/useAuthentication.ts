//importamos container de casos de uso
import { authenticationUseCases } from '@/dependency-injection/auth.container'
import type { AuthenticationResponse } from '@/services/Authentication/domain/models/User'
import { useAsyncHandler } from './useAsyncHandler'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { useRouter } from 'vue-router'

export function useAuthentication() {
  const router = useRouter()
  //get from useAsyncHandler
  const { loading, error, runUseCase } = useAsyncHandler()
  //instance autenthenticationStore
  const autenthenticationStore = useAuthenticationStore()

  const loginEmployee = async (email: string, password: string) => {
    const response: AuthenticationResponse = await runUseCase('loginEmployee', () =>
      authenticationUseCases.loginEmployee.execute(email, password),
    )
    //adapt
    autenthenticationStore.setUser(response)
    return response
  }

  const logoutUser = async () => {
    autenthenticationStore.cleanUser()

    router.push('/')
    return await runUseCase('logout', () => authenticationUseCases.logoutUser.execute())
    //for redirect
  }


  //para obtener el rol de un usuario
  const getMainRole = () => {
    autenthenticationStore.recoverUserFromSession()
    return autenthenticationStore.userRole
  }

  //para obtener entityId de un usuario
  const getUserId = () => {
    autenthenticationStore.recoverUserFromSession()
    return autenthenticationStore.userId
  }

  //para
  return {
    loading,
    error,
    loginEmployee,
    logoutUser,
    getMainRole,
    getUserId,
  }
}
