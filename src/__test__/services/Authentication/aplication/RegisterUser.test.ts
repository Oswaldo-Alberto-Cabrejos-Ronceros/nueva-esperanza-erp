import { describe, it, expect } from 'vitest'
import { RegisterUserClient } from '@/services/Authentication/aplication/ResgisterUserClient'
import { AuthenticationServiceMock } from '@/__mocks__/AuthenticationServiceMock'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { beforeEach } from 'vitest'
describe('RegisterUser', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('when user register in, it must be saved in the store', async () => {
    const authService = new AuthenticationServiceMock()
    const registerUser = new RegisterUserClient(authService)
    const user = await registerUser.execute({
      dni: '',
      name: '',
      lastName: '',
      address: '',
      phone: '',
      birthDate: '',
      headquarter: {
        headquarterId: 0,
      },
      user: {
        email: '',
        password: '',
      },
    })
    const authenticationStore = useAuthenticationStore()
    authenticationStore.setUser({
      userId: user.userId,
      entityId: user.entityId,
      mainRole: user.mainRole,
    })
    expect(user.entityId).toBe(1)
    expect(authenticationStore.user?.entityId).toBe(1)
    expect(authenticationStore.user?.mainRole).toBe('CLIENT')
    expect(authenticationStore.user?.userId).toBe(1)
    expect(authenticationStore.userRole).toBe('CLIENT')
  })
})
