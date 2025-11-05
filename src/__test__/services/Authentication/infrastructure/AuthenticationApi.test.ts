import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthenticationServiceImpl } from '@/services/Authentication/infrastructure/AuthenticationServiceImpl'
import type { User, UserClientRequest } from '@/services/Authentication/domain/models/User'
import { safeFetch } from '@/utilities/safeFetch'
import type { Mock } from 'vitest'

// safeFetch mock
vi.mock('@/utilities/safeFetch', () => ({
  safeFetch: vi.fn(),
}))

describe('AuthenticationServiceImpl', () => {
  //mock user
  const mockUser: User = {
    userId: 0,
    entityId: 0,
    mainRole: '',
    groupedPermissions: {},
  }

  beforeEach(() => {
    vi.restoreAllMocks()
    ;(safeFetch as Mock).mockReset()
  })

  it('should log in successfully and return user', async () => {
    ;(safeFetch as Mock).mockResolvedValue(mockUser)
    //user login
    const authApi = new AuthenticationServiceImpl()
    const user = await authApi.loginClient('OswC@gmail.com', '123456')

    expect(user).toEqual(mockUser)
    //verify the request
    expect(safeFetch).toHaveBeenCalledWith(
      'https://veterinaria-deployment-production.up.railway.app/api/auth/login/client',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'OswC@gmail.com', password: '123456' }),
        credentials: 'include',
      }),
    )
  })

  it('should register successfully and return user', async () => {
    ;(safeFetch as Mock).mockResolvedValue(mockUser)

    const authApi = new AuthenticationServiceImpl()
    const userRegister: UserClientRequest = {
      dni: '',
      name: '',
      lastName: '',
      address: '',
      phone: '',
      birthDate: '',
      headquarter: { headquarterId: 0 },
      user: { email: '', password: '' },
    }

    const user = await authApi.register(userRegister)

    expect(user).toEqual(mockUser)
    expect(safeFetch).toHaveBeenCalledWith(
      'https://veterinaria-deployment-production.up.railway.app/api/auth/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegister),
        credentials: 'include',
      }),
    )
  })

  it('should logout successfully', async () => {
    ;(safeFetch as Mock).mockResolvedValue(undefined)

    const authApi = new AuthenticationServiceImpl()
    await authApi.logout()

    expect(safeFetch).toHaveBeenCalledWith(
      'https://veterinaria-deployment-production.up.railway.app/api/auth/logout',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    )
  })
})
