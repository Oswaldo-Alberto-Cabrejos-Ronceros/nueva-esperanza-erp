export interface Employee {
  employeeId: number
  dni: string
  cmvp?: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage: string
  headquarter: {
    headquarterId: number
    name: string
  }
  user?: {
    userId?: number
    email: string
    password?: string
  }
  roles: { roleId: number; name: string }[]
}

export interface EmployeeRequest {
  dni: string
  cmvp?: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage: string
  headquarter: {
    headquarterId: number
  }
  user?: {
    email: string
    password: string
  }
  roles: { roleId: number }[]
}

export interface MyInfoEmployee {
  employeeId: number
  user: {
    id: number
    email: string
  }
  dni: string
  cmvp?: string
  names: string
  lastNames: string
  address: string
  phone: string
  headquarter: {
    id: number
    name: string
  }
  birthDate: string
  dirImage?: string
  roles: [
    {
      id: number
      name: string
    },
  ]
}

export interface EmployeeBasicInfo {
  id: number
  fullName: string
}

export interface EmployeeList {
  employeeId: number
  dni: string
  cmvp: string
  name: string
  lastName: string
  rolName: string
  nameHeadquarter: string
  status: string
}

export interface StatsVeterinarianPanel {
  totalCares: number
  totalPatients: number
  totalRecords: number
}
