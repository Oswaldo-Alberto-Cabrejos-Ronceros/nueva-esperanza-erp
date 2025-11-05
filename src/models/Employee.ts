export interface Employee {
  userId?: number
  employeeId: number
  dni: string
  cmvp?: string
  names: string
  lastnames: string
  address: string
  phone: string
  headquarter: {
    headquarterId: number
    name: string
  }
  birthdate: string
  dirImage: string
  roles: { roleId: number; name: string }[]
}
