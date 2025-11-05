import type { RoleService } from '../domain/services/RoleService'

export class ActivateRole {
  constructor(private readonly service: RoleService) {}

  async execute(roleId: number): Promise<void> {
    await this.service.activateRole(roleId)
  }
}
