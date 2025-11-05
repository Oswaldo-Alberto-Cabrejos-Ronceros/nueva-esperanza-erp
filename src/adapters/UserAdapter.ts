import type { UserSession } from '@/models/UserSession'
import type { User, UserClientRequest } from '@/services/Authentication/domain/models/User'
import { GroupedPermissionsAdapter } from './GroupedPermissionsAdapter'
import type { UserClientRegister } from '@/models/UserClientRegister'
import { DateAdapter } from './DateAdapter'

export class UserAdapter {
  //for adapt user to userSession
  static toUserSession(user: User): UserSession {
    return {
      userId: user.userId,
      entityId: user.entityId,
      mainRole: user.mainRole,
      groupedPermissions: user.groupedPermissions
        ? GroupedPermissionsAdapter.toGroupedPermissionView(user.groupedPermissions)
        : {},
    }
  }
  static userClientRegisterToUserClientRequest(
    userClientRegister: UserClientRegister,
  ): UserClientRequest {
    return {
      dni: userClientRegister.dni,
      name: userClientRegister.names,
      lastName: userClientRegister.lastnames,
      address: userClientRegister.address,
      phone: userClientRegister.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(userClientRegister.birthdate),
      headquarter: {
        headquarterId: userClientRegister.headquarter,
      },
      user: {
        email: userClientRegister.email,
        password: userClientRegister.password,
      },
    }
  }
}
