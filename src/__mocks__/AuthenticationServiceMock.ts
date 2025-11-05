import type { AuthenticationService } from '@/services/Authentication/domain/services/AuthenticationService'
import type { User, UserClientRequest } from '@/services/Authentication/domain/models/User'

export class AuthenticationServiceMock implements AuthenticationService {
  async loginClient(email: string, password: string): Promise<User> {
    console.log(email, password)
    return {
      userId: 1,
      entityId: 1,
      mainRole: 'ADMIN',
      groupedPermissions: {},
    }
  }
  async loginEmployee(email: string, password: string): Promise<User> {
    console.log(email, password)
    return {
      userId: 1,
      entityId: 1,
      mainRole: 'ADMIN',
      groupedPermissions: {},
    }
  }
  async login(email: string, password: string): Promise<User> {
    console.log(email, password)
    return {
      userId: 1,
      entityId: 1,
      mainRole: 'ADMIN',
      groupedPermissions: {},
    }
  }
  async register(user: UserClientRequest): Promise<User> {
    console.log(user)
    return {
      userId: 1,
      entityId: 1,
      mainRole: 'CLIENT',
      groupedPermissions: {},
    }
  }
  async logout(): Promise<void> {
    console.log("Cerrando sesion")
    return
  }
}
