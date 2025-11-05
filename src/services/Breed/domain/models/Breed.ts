export interface Breed {
  breedId: number
  name: string
  status: boolean
  specie: {
    specieId: number,
    name:string,
    imagePath:string
  }
}

export interface BreedRequest {
  name:string,
  specie:{
    specieId:number
  }
}

export interface BreedList{
      breedId:number;
    name:string;
   specieName:string;
   status:string;
}
