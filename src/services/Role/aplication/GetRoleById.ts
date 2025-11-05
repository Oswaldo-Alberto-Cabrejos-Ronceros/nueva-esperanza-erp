import type { Role } from '../domain/models/Role'
import type { RoleService } from '../domain/services/RoleService'

export class GetRoleById {
  constructor(private readonly roleService: RoleService) {}

  async execute(roleId: number): Promise<Role> {
    return await this.roleService.getRoleById(roleId)
  }
}
