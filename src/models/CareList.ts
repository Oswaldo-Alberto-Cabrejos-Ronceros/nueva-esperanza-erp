
export interface CareList {
  id: number
  careDateTime: string
  status: string

  pet:{
      name: string
  specieName: string
  breedName: string
  }

  employee:{
    fullName:string
  }

  service:{
      name: string
  price: number
  }

  headquarter:{
    name:string
  }

  appointment:{
    id:number
  }

}
