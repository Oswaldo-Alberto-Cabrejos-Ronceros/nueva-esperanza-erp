export interface Headquarter {
  headquarterId: number
  name: string
  phone: string
  address: string
  email: string
  district: string
  province: string
  department: string
  startTime: string
  endTime: string
}

export interface HeadquarterRequest {
  name: string
  phone: string
  address: string
  email: string
  district: string
  province: string
  department: string
  startTime: string
  endTime: string
}

export interface HeadquarterList {
  headquarterId: number
  name: string
  phone: string
  address: string
  email: string
  district: string
  province: string
  status: string
}
