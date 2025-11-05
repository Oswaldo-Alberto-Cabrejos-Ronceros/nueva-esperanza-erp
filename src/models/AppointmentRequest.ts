export interface AppointmentRequest {
  date:Date,
  time:string,
  comment?:string,
  headquarterVetServiceId:number,
  petId:number,
  paymentMethodId:number
}
