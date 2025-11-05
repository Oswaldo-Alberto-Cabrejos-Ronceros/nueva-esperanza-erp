import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { ReniecResponseSimple } from '../domain/models/Reniec'
import type { ReniecService } from '../domain/services/ReniecService'

export class ReniecServiceImpl implements ReniecService {
  constructor(private readonly httpClient: HttpClient) {}
  //url
  private urlbBase = '/reniec'

  async getInfoSimpleByReniec(dni: string): Promise<ReniecResponseSimple> {
    const response = this.httpClient.get<ReniecResponseSimple>(`${this.urlbBase}/${dni}/simple`)
    return (await response).data
  }
}
