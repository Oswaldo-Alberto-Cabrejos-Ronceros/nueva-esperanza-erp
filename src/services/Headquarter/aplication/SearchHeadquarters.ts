import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class SearchHeadquarters {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(
    page: number,
    size: number,
    name?: string,
    phone?: string,
    address?: string,
    email?: string,
    district?: string,
    province?: string,
    status?:boolean
  ) {
    return await this.headquarterService.searchHeadquarters(
      page,
      size,
      name,
      phone,
      address,
      email,
      district,
      province,
      status
    )
  }
}
