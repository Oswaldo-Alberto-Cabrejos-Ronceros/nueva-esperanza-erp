import type { Permission } from "./Permission";

export interface ModulePermission{
  name:string,
  permissions:Permission [],
  authorizedPermissions?:number[]
}
