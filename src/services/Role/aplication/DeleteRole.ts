import type { RoleService } from '../domain/services/RoleService'

export class DeleteRole {
  constructor(private readonly roleService: RoleService) {}

  async execute(roleId: number) {
    await this.roleService.deleteRole(roleId)
  }
}
