import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreateRole } from '@/services/Role/aplication/CreateRole'
import { DeleteRole } from '@/services/Role/aplication/DeleteRole'
import { GetAllRoles } from '@/services/Role/aplication/GetAllRoles'
import { GetRoleById } from '@/services/Role/aplication/GetRoleById'
import { UpdateRole } from '@/services/Role/aplication/UpdateRole'
import { ActivateRole } from '@/services/Role/aplication/ActivateRole'
import { RoleServiceImpl } from '@/services/Role/infrastructure/RoleServiceImpl'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const roleService = new RoleServiceImpl(axiosHttpClient)

//expose uses cases

export const roleUsesCases = {
  //inject dependency
  getAllRoles: new GetAllRoles(roleService),
  getRoleById: new GetRoleById(roleService),
  createRole: new CreateRole(roleService),
  updateRole: new UpdateRole(roleService),
  deleteRole: new DeleteRole(roleService),
  activateRole: new ActivateRole(roleService)
}
