import type { ServiceHeadquarter } from "./ServiceHeadquarter";

export interface ServiceHeadquarterSet{
  headquarterId:number,
  unassignedServices:ServiceHeadquarter[],
  assignedServices:ServiceHeadquarter[]
}
