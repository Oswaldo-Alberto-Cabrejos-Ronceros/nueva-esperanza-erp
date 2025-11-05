<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-category'
import type { FormValues as SearchCategorySchema } from '@/validation-schemas-forms/schema-search-category'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import AddEditCategoryCard from './components/AddEditCategoryCard.vue'
import { useDialog, useToast } from 'primevue'
import type { FormValues as AddEditCategorySchema } from '@/validation-schemas-forms/schema-add-edit-category'
import ViewCategoryCard from './components/ViewCategoryCard.vue'
import { useConfirm } from 'primevue'
import { useCategory } from '@/composables/useCategory'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import { useAuthentication } from '@/composables/useAuthentication'
import type { CategoryList } from '@/models/CategoryList'
import type { OptionSelect } from '@/models/OptionSelect'
import Select from 'primevue/select'
import CardLoader from '@/components/CardLoader.vue'

//for toast
const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

//methods

const {
  loading,
  error,
  getCategoryById,
  createCategory,
  updateCategory,
  activateCategory,
  deleteCategory,
  searchCategories,
} = useCategory()

const typedError = error as Record<string, string | null>

//categories

const categories = ref<CategoryList[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

const searchCategoriesDebounced = debounce(() => loadCategories(), 400)

onMounted(async () => {
  loadCategories()
})

//load categories
const loadCategories = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const response = await searchCategories({
    page,
    size,
    name: name.value,
    status: status.value,
  })

  categories.value = response.content
  totalRecords.value = response.totalElements
  const role = getMainRole()
  if (role) {
    roleMain.value = role
  }
}

//form
const { resetForm, handleSubmit, errors, defineField } = useForm<SearchCategorySchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadCategories()
}

const [name, nameAttrs] = defineField('name')
const [status, statusAttrs] = defineField('status')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const statusOptions: OptionSelect[] = [
  {
    value: true,
    name: 'Activo',
  },
  {
    value: false,
    name: 'Desactivado',
  },
]

//for add

//for dialog
const dialog = useDialog()

const addCategory = () => {
  dialog.open(AddEditCategoryCard, {
    props: {
      modal: true,
      header: 'Agregar categoria',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditCategorySchema
      if (data) {
        try {
          const category = await createCategory(data)
          console.log('Datos recibidos', category)
          loadCategories()
          showToast('Categoria agregada exitosamente: ' + category.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.createCategory) {
            showToast(
              'Error al crear la categoria: ' + data.name + typedError.createCategory,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al crear la categoria', 'warn', 'Error')
          }
        }
      }
    },
  })
}

//edit

const editCategory = async (categoryData: CategoryList) => {
  const category = await getCategoryById(categoryData.categoryId)
  dialog.open(AddEditCategoryCard, {
    props: {
      modal: true,
      header: `${categoryData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      categoryData: category as AddEditCategorySchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditCategorySchema
      if (data) {
        try {
          const updatedCategory = await updateCategory(categoryData.categoryId, data)
          console.log('Datos recibidos', updatedCategory)
          loadCategories()
          showToast(
            'Categoría actualizada exitosamente: ' + updatedCategory.name,
            'success',
            'Éxito',
          )
        } catch (error) {
          console.error(error)
          if (typedError.updateCategory) {
            showToast(
              'Error al actualizar la categoría: ' + data.name + typedError.updateCategory,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al actualizar la categoría', 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for view

const viewCategory = async (categoryData: CategoryList) => {
  const category = await getCategoryById(categoryData.categoryId)
  dialog.open(ViewCategoryCard, {
    props: {
      modal: true,
      header: `${categoryData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      categoryData: category,
    },
  })
}

//for confirm
const confirm = useConfirm()

const handleDeleteReactiveCategory = (
  event: MouseEvent | KeyboardEvent,
  categoryData: CategoryList,
) => {
  const isActive = categoryData.status

  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: isActive
      ? '¿Seguro que quiere bloquear esta categoría?'
      : 'Seguro que quiere reactivar esta categoria',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: isActive ? 'Bloquear' : 'Activar',
      severity: isActive ? 'danger' : 'success',
    },
    accept: async () => {
      if (isActive) {
        await deleteCategory(categoryData.categoryId)
        showToast('Categoría eliminado exitosamente: ' + categoryData.name, 'success', 'Éxito')
      } else {
        await activateCategory(categoryData.categoryId)
        showToast('Categoría reactivada exitosamente: ' + categoryData.name, 'success', 'Éxito')
      }

      loadCategories()
    },
    reject: () => {
      console.log('Acción cancelada')
    },
  })
}

//for export
</script>

<template>
  <div class="layout-principal-flex">
    <CardLoader
      v-if="
        loading.deleteCategory ||
        loading.activateCategory ||
        loading.updateCategory ||
        loading.createCategory
      "
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de categorias</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText
                  v-model="name"
                  v-bind="nameAttrs"
                  :invalid="Boolean(errors.name)"
                  @update:model-value="searchCategoriesDebounced"
                  class="w-full"
                  placeholder="Nombre de la categoria"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
              </Message>
            </div>
            <!-- status -->

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
                @update:model-value="searchCategoriesDebounced"
              />

              <Message v-if="errors.status" severity="error" size="small" variant="simple">
                {{ errors.status }}
              </Message>
            </div>
            <div class="form-button-search-container-grid-col-5-end">
              <Button
                size="small"
                class="py-2"
                severity="secondary"
                variant="outlined"
                label="Limpiar"
                iconPos="left"
                icon="pi pi-replay"
                @click="handleResetForm"
              />
            </div>
          </form>
          <!-- for messague loading  -->
          <Message v-if="loading.getAllCategories" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllCategories" severity="error" size="small" variant="simple">
            Error al cargar las categorias
          </Message>
          <!-- table -->
          <DataTable
            :value="categories"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchCategories"
            :rows-per-page-options="[5, 10, 15, 20]"
            @page="loadCategories"
            scrollable
            removableSort
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Categoria"
                  @click="addCategory"
                  v-if="roleMain === 'Administrador'"
                />
              </div>
            </template>

            <Column field="name" header="Nombre" sortable style="width: 20%"></Column>
            <Column field="description" sortable header="Descripción" style="width: 60%"></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-col sm:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    aria-label="Filter"
                    size="small"
                    rounded
                    @click="viewCategory(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    aria-label="Filter"
                    size="small"
                    rounded
                    v-if="roleMain === 'Administrador'"
                    @click="editCategory(data)"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    aria-label="Eliminar"
                    rounded
                    size="small"
                    v-if="data.status === 'Activo' && roleMain === 'Administrador'"
                    @click="handleDeleteReactiveCategory($event, data)"
                  />
                  <Button
                    v-if="data.status === 'Inactivo' && roleMain === 'Administrador'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="handleDeleteReactiveCategory($event, data)"
                  ></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
