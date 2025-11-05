import { CreateCategory } from '@/services/Category/aplication/CreateCategory'
import { DeleteCategory } from '@/services/Category/aplication/DeleteCategory'
import { GetAllCategories } from '@/services/Category/aplication/GetAllCategories'
import { GetCategoryById } from '@/services/Category/aplication/GetCategoryById'
import { UpdateCategory } from '@/services/Category/aplication/UpdateCategory'
import { ActivateCategory } from '@/services/Category/aplication/ActivateCategory'
import { CategoryServiceImpl } from '@/services/Category/infrastructure/CategoryServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { SearchCategories } from '@/services/Category/aplication/SearchCategories'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const categoryService = new CategoryServiceImpl(axiosHttpClient)

//expose uses case

export const categoryUsesCases = {
  //inject dependency
  createCategory: new CreateCategory(categoryService),
  deleteCategory: new DeleteCategory(categoryService),
  getAllCategories: new GetAllCategories(categoryService),
  getCategoryById: new GetCategoryById(categoryService),
  updateCategory: new UpdateCategory(categoryService),
  activateCategory: new ActivateCategory(categoryService),
  searchCategories: new SearchCategories(categoryService),
}
