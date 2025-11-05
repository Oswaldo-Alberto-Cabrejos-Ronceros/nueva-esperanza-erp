import type { Category } from '../domain/models/Category'
import type { CategoryService } from '../domain/services/CategoryService'

export class GetCategoryById {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(categoryId: number): Promise<Category> {
    return this.categoryService.getCategoryById(categoryId)
  }
}
