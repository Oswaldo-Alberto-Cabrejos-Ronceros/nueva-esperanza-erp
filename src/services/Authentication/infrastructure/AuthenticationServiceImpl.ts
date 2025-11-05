import type { AuthenticationService } from '../domain/services/AuthenticationService'
import type { User, UserClientRequest } from '../domain/models/User'
import { safeFetch } from '@/utilities/safeFetch'

export class AuthenticationServiceImpl implements AuthenticationService {
  async loginEmployee(email: string, password: string): Promise<User> {
    const data = await safeFetch<User>(`${import.meta.env.VITE_API_URL}/auth/login/employee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    return {
      userId: data.userId,
      entityId: data.entityId,
      mainRole: data.mainRole,
      groupedPermissions: data.groupedPermissions,
    }
  }
  async loginClient(email: string, password: string): Promise<User> {
    const data = await safeFetch<User>(`${import.meta.env.VITE_API_URL}/auth/login/client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    return {
      userId: data.userId,
      entityId: data.entityId,
      mainRole: data.mainRole,
      groupedPermissions: data.groupedPermissions,
    }
  }
  async register(user: UserClientRequest): Promise<User> {
    const data = await safeFetch<User>(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    })
    return {
      userId: data.userId,
      entityId: data.entityId,
      mainRole: data.mainRole,
      groupedPermissions: data.groupedPermissions,
    }
  }
  async logout(): Promise<void> {
    await safeFetch<void>(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  }
}
