import type { Role, RoleRequest } from '../models/Role'

export interface RoleService {
  getAllRoles(): Promise<Role[]>
  getRoleById(roleId: number): Promise<Role>
  createRole(roleRequest: RoleRequest): Promise<Role>
  updateRole(roleId: number, roleRequest: RoleRequest): Promise<Role>
  deleteRole(roleId: number): Promise<void>
  activateRole(roleId: number): Promise<void>
}
