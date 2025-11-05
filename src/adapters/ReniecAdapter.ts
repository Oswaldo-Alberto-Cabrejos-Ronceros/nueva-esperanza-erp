import type { ReniecResponseSimple } from '@/services/Reniec/domain/models/Reniec'
import type { BasicInfoByReniec } from '@/models/BasicInfoByReniec'
export class ReniecAdapter {
  static reniecResponseSimpleToBasicInfoByReniec(
    reniecResponse: ReniecResponseSimple,
  ): BasicInfoByReniec {
    return {
      names: reniecResponse.names,
      lastnames: reniecResponse.lastName,
    }
  }
}
