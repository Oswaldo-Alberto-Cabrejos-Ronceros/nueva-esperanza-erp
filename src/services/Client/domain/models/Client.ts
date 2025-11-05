export interface Client {
  clientId: number
  dni: string
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
  blockNote?: string
}

export interface ClientRequest {
  dni: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage?: string
  headquarter: {
    headquarterId: number
  }
  user?: {
    email?: string
    password?: string
  }
}

export interface MyInfoClient {
  clientId: number
  user: {
    id: number
    email: string
  }
  dni: string
  names: string
  lastNames: string
  phone: string
  address: string
  headquarter: {
    id: number
    name: string
  }
}

export interface ClientUpdateAsClient {
  address: string
  phone: string
  headquarterId: number
}

export interface ClientBasicInfoByDni {
  id: number
  fullName: string
}

export interface ClientList {
  clientId: number
  dni: string
  name: string
  lastName: string
  headquarterName: string
  status: string
}

export interface ClientStatsPanel {
  totalClients: number
  currentMonth: number
  previousMonth: number
  difference: string
}

export interface ClientInfoPanelAdmin {
  clientId: number
  fullName: string
  initials: string
  phone: string
}

export interface ClientStatsToday {
  totalClientsAttended: number
  todayClientsAttended: number
}
