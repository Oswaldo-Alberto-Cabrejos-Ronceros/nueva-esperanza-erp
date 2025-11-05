import type { Category } from "../domain/models/Category";
import type { CategoryService } from "../domain/services/CategoryService";

export class GetAllCategories{
  constructor(private readonly categoryService:CategoryService){}

  async execute ():Promise<Category[]>{
    return await this.categoryService.getAllCategories()
  }
}
