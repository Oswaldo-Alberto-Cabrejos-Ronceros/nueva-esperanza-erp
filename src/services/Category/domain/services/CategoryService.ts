import type { Category, CategoryList, CategoryRequest } from '../models/Category'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchCategoryParams } from '../models/SearchCategoryParams'

export interface CategoryService {
  getAllCategories(): Promise<Category[]>

  getCategoryById(id: number): Promise<Category>

  createCategory(categoryRequest: CategoryRequest): Promise<Category>

  updateCategory(id: number, categoryRequest: CategoryRequest): Promise<Category>

  deleteCategory(id: number): Promise<void>

  activateCategory(categoryId: number): Promise<void>

  searchCategories(
    params: SearchCategoryParams
  ): Promise<PageResponse<CategoryList>>
}
