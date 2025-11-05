import type { GroupedPermissions } from '@/services/Authentication/domain/models/User'
import type { GroupedPermissions as GroupedPermissionsView } from '@/models/GroupedPermissions'

export class GroupedPermissionsAdapter {
  static toGroupedPermissionView(grupedPermissions: GroupedPermissions): GroupedPermissionsView {
    return {
      pet: grupedPermissions.animal,
      breed: grupedPermissions.breed,
      categorie: grupedPermissions.categorie,
      client: grupedPermissions.client,
      employee: grupedPermissions.employee,
      headquarter: grupedPermissions.headquarter,
      paymentMethod: grupedPermissions.paymentMethod,
      permission: grupedPermissions.permission,
      role: grupedPermissions.role,
      specie: grupedPermissions.specie,
      veterinaryService: grupedPermissions.veterinaryService,
      payment: grupedPermissions.payment,
    }
  }
}
