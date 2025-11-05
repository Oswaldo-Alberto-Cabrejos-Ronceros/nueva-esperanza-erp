import type { Role } from "../domain/models/Role";
import type { RoleService } from "../domain/services/RoleService";

export class GetAllRoles{
    constructor(private readonly roleService:RoleService){}

    async execute():Promise<Role[]>{
        return await this.roleService.getAllRoles()
    }
}
