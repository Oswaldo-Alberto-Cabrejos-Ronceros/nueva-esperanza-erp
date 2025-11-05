import type { PageResponse } from '@/services/models/PageResponse'
import type { Headquarter, HeadquarterList, HeadquarterRequest } from '../models/Headquarter'

export interface HeadquarterService {
  getAllHeadquarters(): Promise<Headquarter[]>

  getHeadquarterById(id: number): Promise<Headquarter>

  createHeadquarter(headquarterRequest: HeadquarterRequest): Promise<Headquarter>

  updateHeadquarter(id: number, headquarterRequest: HeadquarterRequest): Promise<Headquarter>

  searchHeadquarters(
    page: number,
    size: number,
    name?: string,
    phone?: string,
    address?: string,
    email?: string,
    district?: string,
    province?: string,
    status?:boolean
  ): Promise<PageResponse<HeadquarterList>>

  deleteHeadquarter(id: number): Promise<void>

  activateHeadquarter(id: number): Promise<void>
}
