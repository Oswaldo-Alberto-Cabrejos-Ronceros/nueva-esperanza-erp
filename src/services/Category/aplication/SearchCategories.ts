import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchCategoryParams } from '../domain/models/SearchCategoryParams'
import type { CategoryService } from '../domain/services/CategoryService'
import type { CategoryList } from '../domain/models/Category'

export class SearchCategories {
  constructor(private readonly service: CategoryService) {}

  execute(params: SearchCategoryParams): Promise<PageResponse<CategoryList>> {
    return this.service.searchCategories(params)
  }
}
