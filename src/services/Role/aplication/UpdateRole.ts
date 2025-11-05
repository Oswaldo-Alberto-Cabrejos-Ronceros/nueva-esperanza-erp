import type { RoleRequest } from '../domain/models/Role'
import type { RoleService } from '../domain/services/RoleService'

export class UpdateRole {
  constructor(private readonly roleService: RoleService) {}

  async execute(roleId: number, roleRequest: RoleRequest) {
    return await this.roleService.updateRole(roleId, roleRequest)
  }
}
