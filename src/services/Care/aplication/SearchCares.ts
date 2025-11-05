
import type { PageResponse } from '@/services/models/PageResponse'
import type {  CareList } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'

export class SearchCares {
  constructor(private readonly careService: CareService) {}

  async execute(
    status?: string,
    fecha?: string,
    idHeadquarter?: number,
    idService?: number,
    page?: number,
    size?: number
  ): Promise<PageResponse<CareList>> {
    return await this.careService.searchCares(
      status,
      fecha,
      idHeadquarter,
      idService,
      page,
      size
    )
  }
}
