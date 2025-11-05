import type { ReportPeriod } from '@/services/enums/ReportPeriod'
import type { Specie, SpecieRequest, SpecieList, TopSpeciesByAppointments, TopSpeciesCare } from '../models/Specie'
import type { PageResponse } from '@/services/models/PageResponse'

export interface SpecieService {
  getSpecieById(specieId: number): Promise<Specie>
  getAllSpecies(): Promise<Specie[]>
  createSpecie(specieRequest: SpecieRequest): Promise<Specie>
  updateSpecie(specieId: number, specieRequest: SpecieRequest): Promise<Specie>
  deleteSpecie(specieId: number): Promise<void>
  activateSpecie(specieId: number): Promise<void>

  searchSpecies(
    page: number,
    size: number,
    name?: string,
    status?: boolean
  ): Promise<PageResponse<SpecieList>>

  getTopSpeciesGeneral(): Promise<TopSpeciesByAppointments>
getTopSpeciesByHeadquarter(headquarterId: number): Promise<TopSpeciesByAppointments>
getTopSpeciesByPeriod(period: ReportPeriod): Promise<TopSpeciesCare>
getTopSpeciesByPeriodAndHeadquarter(period: ReportPeriod, headquarterId: number): Promise<TopSpeciesCare>


}

