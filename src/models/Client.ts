export interface Client {
  clientId: number
  dni: string
  names: string
  lastnames: string
  phone: string
  address: string
  birthdate: string // format: (dd-mm-yyyy)
  headquarter: {
    headquarterId: number
    name: string
  }
  user?: {
    userId?: number
    email?: string
  }
}
