import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { RoleService } from '../domain/services/RoleService'
import type { Role, RoleRequest } from '../domain/models/Role'

export class RoleServiceImpl implements RoleService {
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/roles'
  async getAllRoles(): Promise<Role[]> {
    const response = await this.httpClient.get<Role[]>(this.urlBase)
    return response.data
  }
  async getRoleById(roleId: number): Promise<Role> {
    const response = await this.httpClient.get<Role>(`${this.urlBase}/${roleId}`)
    return response.data
  }

  async createRole(roleRequest: RoleRequest): Promise<Role> {
    const response = await this.httpClient.post<Role>(this.urlBase, roleRequest)
    return response.data
  }

  async updateRole(roleId: number, roleRequest: RoleRequest): Promise<Role> {
    const response = await this.httpClient.put<Role>(`${this.urlBase}/${roleId}`, roleRequest)
    return response.data
  }

  async deleteRole(roleId: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${roleId}`)
  }
  async activateRole(roleId: number): Promise<void> {
    await this.httpClient.put(`${this.urlBase}/${roleId}/activate`, {})
  }
}
