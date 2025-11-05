import type { Category } from '@/services/Category/domain/models/Category'
import type { Category as CategoryView } from '@/models/Category'
import type { FormValues as CategoryAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-category'
import type { CategoryRequest } from '@/services/Category/domain/models/Category'
import type { CategoryList as CategoryListDTO } from '@/services/Category/domain/models/Category'
import type { CategoryList as CategoryListView } from '@/models/CategoryList'

export class CategoryAdapter {
  static toCategoryView(category: Category): CategoryView {
    return {
      id: category.categoryId,
      name: category.name,
      description: category.description,
    }
  }

  static fromSchemaAddEditToCategoryRequest(schemaAddEdit: CategoryAddEditSchema): CategoryRequest {
    return {
      name: schemaAddEdit.name,
      description: schemaAddEdit.description,
    }
  }

  static fromCategoryListToCategoryListView(category: CategoryListDTO): CategoryListView {
    return {
      categoryId: category.categoryId,
      name: category.name,
      description: category.description,
      status: category.status,
    }
  }
}
