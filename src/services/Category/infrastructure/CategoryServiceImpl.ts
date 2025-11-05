import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Category, CategoryRequest, CategoryList } from '../domain/models/Category'
import type { CategoryService } from '../domain/services/CategoryService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchCategoryParams } from '../domain/models/SearchCategoryParams'

export class CategoryServiceImpl implements CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/categories'

  async getAllCategories(): Promise<Category[]> {
    const response = await this.httpClient.get<Category[]>(this.urlBase)
    return response.data
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await this.httpClient.get<Category>(`${this.urlBase}/${id}`)
    return response.data
  }

  async createCategory(categoryRequest: CategoryRequest): Promise<Category> {
    const response = await this.httpClient.post<Category>(this.urlBase, categoryRequest)
    return response.data
  }

  async updateCategory(id: number, categoryRequest: CategoryRequest): Promise<Category> {
    const response = await this.httpClient.put<Category>(`${this.urlBase}/${id}`, categoryRequest)
    return response.data
  }

  async deleteCategory(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }

  async activateCategory(categoryId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${categoryId}/activate`, {})
  }

  async searchCategories(params: SearchCategoryParams): Promise<PageResponse<CategoryList>> {
    const queryParams: Record<string, string | number> = {}

    if (params.name) queryParams.name = params.name
    if (typeof params.status === 'boolean') queryParams.status = String(params.status)
    if (typeof params.page === 'number') queryParams.page = params.page
    if (typeof params.size === 'number') queryParams.size = params.size
    if (params.sort) queryParams.sort = params.sort

    const response = await this.httpClient.get<PageResponse<CategoryList>>(
      `${this.urlBase}/search`,
      { params: queryParams },
    )
    return response.data
  }
}
