<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-service'
import type { FormValues as SearchServiceSchema } from '@/validation-schemas-forms/schema-search-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useConfirm, useDialog, useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import AddEditServiceCard from './components/AddEditServiceCard.vue'
import type { FormValues as AddEditServiceSchema } from '@/validation-schemas-forms/schema-add-edit-service'
import ViewServiceCard from './components/ViewServiceCard.vue'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import { useSpecie } from '@/composables/useSpecie'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import type { ServiceList } from '@/models/ServiceList'
import { useAuthentication } from '@/composables/useAuthentication'
import CardLoader from '@/components/CardLoader.vue'

//toast
const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}

//methods

const {
  loading,
  error,
  createVeterinaryService,
  updateVeterinaryService,
  deleteVeterinaryService,
  activateVeterinaryService,
  searchVeterinaryServices,
  getVeterinaryServiceById,
} = useVeterinaryService()

const typedError = error as Record<string, string | null>

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

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

//services

const services = ref<ServiceList[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

onMounted(async () => {
  loadServices()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  categoriesOptions.value = categoriesToOptionsSelect(await getAllCategories())
})

const loadServices = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const response = await searchVeterinaryServices(
    page,
    size,
    name.value,
    specieId.value?.toString(),
    categoryId.value?.toString(),
    status.value,
  )
  services.value = response.content
  totalRecords.value = response.totalElements
  const role = getMainRole()
  if (role) {
    roleMain.value = role
  }
}

//form
const { resetForm,handleSubmit, errors, defineField } = useForm<SearchServiceSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    categoryId: undefined,
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadServices()
}

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')
const [status, statusAttrs] = defineField('status')

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const searchServicesDebounced = debounce(() => {
  loadServices()
}, 400)

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

const categoriesToOptionsSelect = (category: Category[]): OptionSelect[] => {
  return category.map((category) => ({
    value: category.id,
    name: category.name,
  }))
}

//for dialog
const dialog = useDialog()

//for add

const viewService = async (serviceData: ServiceList) => {
  const service = await getVeterinaryServiceById(serviceData.serviceId)
  dialog.open(ViewServiceCard, {
    props: {
      modal: true,
      header: `${serviceData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      serviceData: service,
    },
  })
}

const addService = async () => {
  dialog.open(AddEditServiceCard, {
    props: {
      modal: true,
      header: 'Agregar servicio',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      categoriesOptions: categoriesToOptionsSelect(await getAllCategories()),
    },
    onClose: async (options) => {
      const data = options?.data
      if (data) {
        try {
          const service = await createVeterinaryService(data)
          console.log('Datos recibidos', service)
          showToast('Servicio agregado exitosamente: ' + data.name, 'success', 'Éxito')
          loadServices()
        } catch (error) {
          console.error(error)
          if (typedError.createVeterinaryService) {
            showToast('Error al agregar servicio: ' + data.name + typedError.createVeterinaryService, 'warn', 'Error')
          } else {
            showToast('Error al agregar servicio: ' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for edit

const editService = async (serviceData: ServiceList) => {
  const service = await getVeterinaryServiceById(serviceData.serviceId)
  dialog.open(AddEditServiceCard, {
    props: {
      modal: true,
      header: `${serviceData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      serviceData: {
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        dirImage: service.dirImage,
        specieId: service.specieId,
        categoryId: service.categoryId,
      } as AddEditServiceSchema,
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      categoriesOptions: categoriesToOptionsSelect(await getAllCategories()),
    },
    onClose: async (options) => {
      const data = options?.data
      if (data) {
        try {
          const service = await updateVeterinaryService(serviceData.serviceId, data)
          console.log('Datos recibidos', service)
          showToast('Servicio editado exitosamente: ' + data.name, 'success', 'Éxito')
          loadServices()
        } catch (error) {
          console.error(error)
          if (typedError.updateVeterinaryService) {
            showToast('Error al actualizar servicio: ' + data.name + typedError.updateVeterinaryService, 'warn', 'Error')
          } else {
            showToast('Error al actualizar servicio: ' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const deleteReactiveService = (event: MouseEvent | KeyboardEvent, serviceData: ServiceList) => {
  const isActive = serviceData.status

  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: isActive
      ? '¿Seguro que quiere eliminar este servicio?'
      : '¿Seguro que quiere reactivar este servicio?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: isActive ? 'Desactivar' : 'Activar',
      severity: isActive ? 'danger' : 'success',
    },
    accept: async () => {
      if (isActive) {
        await deleteVeterinaryService(serviceData.serviceId)
        showToast('Servicio eliminado exitosamente: ' + serviceData.name, 'success', 'Éxito')
      } else {
        await activateVeterinaryService(serviceData.serviceId)
        showToast('Servicio reactivado exitosamente: ' + serviceData.name, 'success', 'Éxito')
      }

      loadServices()
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
           loading.activateVeterinaryService ||
           loading.deleteVeterinaryService ||
           loading.updateVeterinaryService ||
           loading.createVeterinaryService
         "
       ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de servicios</h3>
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
                  class="w-full"
                  placeholder="Nombre"
                  @update:model-value="searchServicesDebounced"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
              </Message>
            </div>
            <!-- specie -->
            <div>
              <label class="block mb-2">Especie</label>
              <Select
              filter
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="speciesOptions"
                :invalid="Boolean(errors.specieId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
                @update:model-value="searchServicesDebounced"
                showClear
              />

              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- category -->
            <div>
              <label class="block mb-2">Categoria</label>
              <Select
              filter
                class="w-full"
                v-bind="categoryIdAttrs"
                v-model="categoryId"
                :options="categoriesOptions"
                :invalid="Boolean(errors.specieId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
                showClear
                @update:model-value="searchServicesDebounced"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
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
                @update:model-value="searchServicesDebounced"
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
          <Message
            v-if="loading.getAllVeterinaryServices"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="error.getAllVeterinaryServices"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar los servicios
          </Message>

          <!-- table -->
          <DataTable
            :value="services"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchVeterinaryServices"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            @page="loadServices"
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
                  label="Agregar Servicio"
                  @click="addService"
                  v-if="roleMain === 'Administrador'"
                />

              </div>
            </template>
            <Column field="name" sortable header="Nombre" style="width: 18%"></Column>
            <Column field="category" sortable header="Categoria" style="width: 18%"></Column>
            <Column field="duration" header="Duración" sortable style="width: 15%"></Column>
            <Column field="price" header="Precio" sortable style="width: 15%"></Column>
            <Column field="specie" sortable header="Especie" style="width: 15%"></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    aria-label="Filter"
                    rounded
                    size="small"
                    @click="viewService(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    aria-label="Filter"
                    rounded
                    @click="editService(data)"
                    size="small"
                    v-if="roleMain === 'Administrador'"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    aria-label="Eliminar"
                    rounded
                    size="small"
                    v-if="data.status === 'Activo' && roleMain === 'Administrador'"
                    @click="deleteReactiveService($event, data)"
                  />
                  <Button
                    v-if="data.status === 'Inactivo' && roleMain === 'Administrador'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="deleteReactiveService($event, data)"
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
