export interface Role {
  roleId: number
  name: string
  description: string
  position: number
}

export interface RoleRequest {
  name: string
  description: string
  position: number
}
