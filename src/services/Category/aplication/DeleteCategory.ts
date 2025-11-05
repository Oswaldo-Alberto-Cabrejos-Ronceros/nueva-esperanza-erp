import type { CategoryService } from '../domain/services/CategoryService'

export class DeleteCategory {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(categoryId: number) {
    await this.categoryService.deleteCategory(categoryId)
  }
}
