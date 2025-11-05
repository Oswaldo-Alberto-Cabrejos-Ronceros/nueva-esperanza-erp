export interface BasicServiceForAppointment {
  headquarterServiceId: number
  id: number
  name: string
  price: string
  duration: number
  imageUrl: string
  description: string
  category: {
    name: string
  }
  specie: {
    name: string
  }
}
