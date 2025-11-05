import type { Category, CategoryRequest } from '../domain/models/Category'
import type { CategoryService } from '../domain/services/CategoryService'

export class UpdateCategory {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(categoryId: number, categoryRequest: CategoryRequest): Promise<Category> {
    return await this.categoryService.updateCategory(categoryId, categoryRequest)
  }
}
