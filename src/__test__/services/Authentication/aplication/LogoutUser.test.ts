import { describe, it, expect } from 'vitest'
import { AuthenticationServiceMock } from '@/__mocks__/AuthenticationServiceMock'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { beforeEach } from 'vitest'
import { LogoutUser } from '@/services/Authentication/aplication/LogoutUser'

describe('LogooutUser',()=>{
  beforeEach(() => {
    //enabled pinia
    setActivePinia(createPinia())
  })
  it('when user log out, it must be deleted in the store', async()=>{
    const authService= new AuthenticationServiceMock();
    const logoutUser = new LogoutUser(authService);
    await logoutUser.execute();
    const authenticationStore= useAuthenticationStore()
    authenticationStore.cleanUser()
    expect(authenticationStore.user).toBe(null);
    expect(authenticationStore.userRole).toBe(null)
  })
})
