export interface Pet {
  id: number
  name: string
  gender: string
  weight: number
  birthdate: string | Date
  comment: string
  urlImage: string
  specie: {
    id: number
    name: string
  }
  breed:{
    id:number,
    name:string
  }
  clientId?: number
}
