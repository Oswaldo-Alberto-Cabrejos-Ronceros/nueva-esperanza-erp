import type { Service } from './Service'

export interface HeadquarterVetService {
  id: number
  headquarterId: number
  service: Service
  simultaneousCapacity: number
  status: boolean
}
