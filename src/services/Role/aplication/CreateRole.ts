import type { Role, RoleRequest } from '../domain/models/Role'
import type { RoleService } from '../domain/services/RoleService'

export class CreateRole {
  constructor(private readonly roleService: RoleService) {}

  async execute(roleRequest: RoleRequest): Promise<Role> {
    return this.roleService.createRole(roleRequest)
  }
}
