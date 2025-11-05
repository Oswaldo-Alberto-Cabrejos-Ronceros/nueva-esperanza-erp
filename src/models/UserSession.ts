import type { GroupedPermissions } from "./GroupedPermissions";

export interface UserSession{
    userId: number,
    entityId:number
    mainRole:string,
    groupedPermissions?:GroupedPermissions
}
