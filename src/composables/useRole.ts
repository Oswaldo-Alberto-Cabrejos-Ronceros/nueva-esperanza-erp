import type { Role } from '@/services/Role/domain/models/Role'
import { useAsyncHandler } from './useAsyncHandler'
import type { Role as RoleView } from '@/models/Role'
import { roleUsesCases } from '@/dependency-injection/role.container'
import { RoleAdapter } from '@/adapters/RoleAdapter'
import type { FormValues as RoleAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-roles'

export function useRole() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  const getAllRoles = async (): Promise<RoleView[]> => {
    const roles: Role[] = await runUseCase('getAllRoles', () => roleUsesCases.getAllRoles.execute())
    return roles.map((role) => RoleAdapter.toRoleView(role))
  }

  const getRoleById = async (roleId: number): Promise<RoleView> => {
    const role: Role = await runUseCase('getRoleById', () =>
      roleUsesCases.getRoleById.execute(roleId),
    )
    return RoleAdapter.toRoleView(role)
  }

  const createRole = async (roleAddEditSchema: RoleAddEditSchema): Promise<RoleView> => {
    const roleRequest = RoleAdapter.fromSchemaAddEditToRoleRequest(roleAddEditSchema)
    const role: Role = await runUseCase('createRole', () =>
      roleUsesCases.createRole.execute(roleRequest),
    )
    return RoleAdapter.toRoleView(role)
  }

  const updateRole = async (
    roleId: number,
    roleAddEditSchema: RoleAddEditSchema,
  ): Promise<RoleView> => {
    const roleRequest = RoleAdapter.fromSchemaAddEditToRoleRequest(roleAddEditSchema)
    const role: Role = await runUseCase('updateRole', () =>
      roleUsesCases.updateRole.execute(roleId, roleRequest),
    )
    return RoleAdapter.toRoleView(role)
  }

  const deleteRole = async (roleId: number) => {
    await runUseCase('deleteRole', () => roleUsesCases.deleteRole.execute(roleId))
  }

  const activateRole = async (roleId: number): Promise<void> => {
    await runUseCase('activateRole', () => roleUsesCases.activateRole.execute(roleId))
  }

  return {
    loading,
    error,
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    activateRole,
  }
}
