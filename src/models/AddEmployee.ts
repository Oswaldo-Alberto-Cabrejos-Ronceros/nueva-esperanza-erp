export interface AddEmployee{
  dni: string
  cmvp?: string
  names: string
  lastnames: string
  address: string
  phone: string
  headquarterId:number
  birthdate: Date|string
  dirImage: string
  roleId: number
  email:string
  password:string
  confirmPassword:string
}