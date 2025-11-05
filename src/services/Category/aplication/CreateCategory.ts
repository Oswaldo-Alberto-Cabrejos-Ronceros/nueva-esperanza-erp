import type { Category, CategoryRequest } from "../domain/models/Category";
import type { CategoryService } from "../domain/services/CategoryService";

export class CreateCategory{
  constructor(private readonly categoryService:CategoryService){}

  async execute(categoryRequest:CategoryRequest):Promise<Category>{
   return await this.categoryService.createCategory(categoryRequest)
  }
}
