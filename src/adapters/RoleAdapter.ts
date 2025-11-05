import type { Role, RoleRequest } from '@/services/Role/domain/models/Role'
import type { Role as RoleView } from '@/models/Role'
import type { FormValues as RoleAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-roles'

export class RoleAdapter {
  static toRoleView(role: Role): RoleView {
    return {
      id: role.roleId,
      name: role.name,
      position: role.position,
      description: role.description,
    }
  }

  static fromSchemaAddEditToRoleRequest(schemaAddEdit: RoleAddEditSchema): RoleRequest {
    return {
      name: schemaAddEdit.name,
      description: schemaAddEdit.description,
      position: schemaAddEdit.position,
    }
  }
}
