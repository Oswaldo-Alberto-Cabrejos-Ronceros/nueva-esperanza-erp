export interface User {
  userId: number
  entityId: number
  mainRole: string
  groupedPermissions: GroupedPermissions
}

export interface GroupedPermissions {
  animal?: string[]
  breed?: string[]
  categorie?: string[]
  client?: string[]
  employee?: string[]
  headquarter?: string[]
  paymentMethod?: string[]
  permission?: string[]
  role?: string[]
  specie?: string[]
  veterinaryService?: string[]
  payment?: string[]
}

export interface UserClientRequest {
  dni: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  headquarter: {
    headquarterId: number
  }
  user: {
    email: string
    password: string
  }
}
