import { describe, it, expect } from 'vitest'
import { LoginEmployee } from '@/services/Authentication/aplication/LoginEmployee'
import { AuthenticationServiceMock } from '@/__mocks__/AuthenticationServiceMock'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { beforeEach } from 'vitest'

describe('LoginUser', () => {
  beforeEach(() => {
    //enabled pinia
    setActivePinia(createPinia())
  })

  it('when user log in, it must be saved in the store', async () => {
    const authService = new AuthenticationServiceMock()
    const loginUser = new LoginEmployee(authService)
    const user = await loginUser.execute('test@gmail.com', '12354')
    const authenticationStore = useAuthenticationStore()
    authenticationStore.setUser({
      userId: user.userId,
      entityId: user.entityId,
      mainRole: user.mainRole
    })
    expect(user.userId).toBe(1)
    expect(authenticationStore.user?.entityId).toBe(1)
    expect(authenticationStore.user?.mainRole).toBe('ADMIN')
    expect(authenticationStore.user?.userId).toBe(1)
  })
})
