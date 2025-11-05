import type { ReniecResponseSimple } from '../models/Reniec'

export interface ReniecService {
  getInfoSimpleByReniec(dni: string): Promise<ReniecResponseSimple>
}
