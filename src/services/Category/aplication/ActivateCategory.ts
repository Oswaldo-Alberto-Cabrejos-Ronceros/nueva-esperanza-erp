import type { CategoryService } from '../domain/services/CategoryService'

export class ActivateCategory {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(categoryId: number): Promise<void> {
    await this.categoryService.activateCategory(categoryId)
  }
}
