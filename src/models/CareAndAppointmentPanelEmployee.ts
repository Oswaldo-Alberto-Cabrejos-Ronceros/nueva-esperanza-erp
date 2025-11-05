export interface CareAndAppointmentPanelEmployee {
  id: number
  type: string
  pet: {
    id:number
    name: string
    breedName:string
  }
  serviceName: string
  clientName: string
  date: string
  hour: string
  status: string
  commentAppointment:string
  employee:{
    id?:number
    name?:string
  }
}
