export interface Category {
  categoryId: number
  name: string
  description: string
  status: boolean
}

export interface CategoryRequest {
  name: string
  description: string
}

export interface CategoryList {
  categoryId: number
  name: string
  description:string
  status: string
}
