export interface Care {
  id: number
  dateTime: string
  statusCare: string
  headquarterVetService: {
    id: number
  }
  appointment?: {
    id?: number
  }
  pet: {
    id: number
  }
  employee:{
    id:number
  }
}
