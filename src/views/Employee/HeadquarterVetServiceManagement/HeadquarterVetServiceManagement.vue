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
import { onMounted, ref } from 'vue'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import { useSpecie } from '@/composables/useSpecie'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'
import { ToggleSwitch, useDialog, useToast } from 'primevue'
import AddHeadquarterVetServiceCard from './components/AddHeadquarterVetServiceCard.vue'
import EditHeadquarterVetServiceCard from './components/EditHeadquarterVetServiceCard.vue'
import type { FormValues as AddHeadquarterVetServiceSchema } from '@/validation-schemas-forms/schema-add-headquarter-vet-service'
import type { FormValues as EditHeadquarterVetServiceSchema } from '@/validation-schemas-forms/schema-edit-headquarter-vet-service'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { ServiceList } from '@/models/ServiceList'
//methods

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

const {
  loading,
  error,

  searchVeterinaryServices,
} = useVeterinaryService()

const typedError = error as Record<string, string | null>

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

const { getHeadquarterById, getAllHeadquarters } = useHeadquarter()

const { getEmployeeMyInfo } = useEmployee()

const { getMainRole, getEntityId } = useAuthentication()

const {
  enableHeadquarterVetService,
  deleteHeadquarterVetService,
  updateSimultaneousCapacity,
  createHeadquarterVetService,
  getAllHeadquarterVetServiceByHeadquarter,
} = useHeadquarterVetService()

//services
const headquartersOptions = ref<OptionSelect[]>([])

const headquarters = ref<Headquarter[]>([])

const services = ref<ServiceList[]>([])

const roleMain = ref<string>('')

const headquarterIdSelected = ref<number | null>(null)

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

const headquarterServices = ref<HeadquarterVetService[][]>([])

function findHeadquarterVetService(
  headquarterId: number,
  serviceId: number,
): HeadquarterVetService | undefined {
  const list = headquarterServices.value.find(
    (subList) => subList.length > 0 && subList[0].headquarterId === headquarterId,
  )
  return list?.find((item) => item.service.id === serviceId)
}

onMounted(async () => {
  loadData()
})

const loadData = async () => {
  loadServices()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  categoriesOptions.value = categoriesToOptionsSelect(await getAllCategories())
  //obtenemos el rol

  const role = getMainRole()

  if (role) {
    roleMain.value = role
    if (role === 'Administrador') {
      if (headquarterIdSelected.value === null) {
        headquarters.value = await getAllHeadquarters()
      } else {
        headquarters.value = []
        headquarters.value.push(await getHeadquarterById(headquarterIdSelected.value))
        loadHeadquarterServices()
        return
      }
    } else {
      const id = getEntityId()
      if (id) {
        const info = await getEmployeeMyInfo(id)
        headquarters.value = []
        headquarters.value.push(await getHeadquarterById(info.headquarter.id))
      }
    }
    headquartersOptions.value = headquartersToOptionsSelect(headquarters.value)
  }

  loadHeadquarterServices()
}

//function for load headquarters service

const loadHeadquarterServices = async () => {
  headquarterServices.value = []

  for (const item of headquarters.value) {
    const service = await getAllHeadquarterVetServiceByHeadquarter(item.id)
    console.log(service)
    console.log(item.id, service)
    headquarterServices.value.push(service)
  }
}

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
  )

  services.value = response.content
  totalRecords.value = response.totalElements
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchServiceSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    categoryId: undefined,
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')

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
    value: specie.name,
    name: specie.name,
  }))
}

const categoriesToOptionsSelect = (category: Category[]): OptionSelect[] => {
  return category.map((category) => ({
    value: category.name,
    name: category.name,
  }))
}

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

//for export


const dialog = useDialog()

const addHeadquarterService = (headquarter: Headquarter, service: ServiceList) => {
  dialog.open(AddHeadquarterVetServiceCard, {
    props: {
      modal: true,
      header: 'Agregar servicio por sede',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquarterId: headquarter.id,
      serviceId: service.serviceId,
    },
    onClose: async (options) => {
      const data = options?.data as AddHeadquarterVetServiceSchema
      if (data) {
        try {
          await createHeadquarterVetService(data)
          console.log('Datos recibidos', headquarter)
          showToast('Servicio por sede creado exitosamente' + ` ${headquarter.name} - ${service.name}`, 'success', 'Éxito')
          loadData()
        } catch (error) {
          console.error(error)
          if (typedError.createHeadquarterVetService) {
            showToast('Error al crear el servicio por sede: ' + typedError.createHeadquarterVetService, 'warn', 'Error')
          } else {
            showToast('Error al crear el servicio por sede', 'warn', 'Error')
          }
        }
      }
    },
  })
}

const editHeadquarterService = async (headquarterService: HeadquarterVetService | undefined) => {
  if (headquarterService) {
    console.log(headquarterService)
    dialog.open(EditHeadquarterVetServiceCard, {
      props: {
        modal: true,
        header: 'Editar servicio por sede',
        blockScroll: true,
        dismissableMask: true,
      },
      data: {
        simultaneousCapacity: headquarterService.simultaneousCapacity,
        status: headquarterService.status,
      },
      onClose: async (options) => {
        const data = options?.data as EditHeadquarterVetServiceSchema
        if (data) {
          console.log('data retornada', data)
          const changeStatus = data.status !== headquarterService.status
          const changeCapacity =
            data.simultaneousCapacity !== headquarterService.simultaneousCapacity

          if (!changeStatus && !changeCapacity) {
            return
          }

          if (changeStatus) {
            if (data.status) {
              await enableHeadquarterVetService(headquarterService.id)
              showToast('Habilitado con exito', 'success', 'Éxito')
            } else {
              await deleteHeadquarterVetService(headquarterService.id)
              showToast('Desabilitado con exito con exito', 'success', 'Éxito')
            }
            loadData()
          }
          if (changeCapacity) {
            try {
              console.log('intentando actualizar capacidad...')
              const response = await updateSimultaneousCapacity(
                headquarterService.id,
                data.simultaneousCapacity,
              )
              console.log('respuesta de actualización', response)
              showToast('Servicio por sede actualizado correctamente', 'success', 'Éxito')
              loadData()
              loadData()
            } catch (error) {
              console.error(error)
              if (typedError.updateSimultaneousCapacity) {
                showToast('Error al actualizar la capacidad: ' + typedError.updateSimultaneousCapacity, 'warn', 'Error')
              } else {
                showToast('Error al actualizar la capacidad', 'warn', 'Error')
              }
            }
          }
        }
      },
    })
  }
}

//
let headquarterServiceAux: HeadquarterVetService | undefined
//ref when active headquarterservice
const activedHeadquarterService = ref<boolean>(true)
const inanctivedHeadquarterService = ref<boolean>(false)
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de servicios por sedes</h3>
      </template>
      <template #subtitle>
        <p>Gestina los servicios disponibles en cada sede</p>
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
                filter
              />

              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- category -->
            <div>
              <label class="block mb-2">Categoria</label>
              <Select
                class="w-full"
                v-bind="categoryIdAttrs"
                v-model="categoryId"
                :options="categoriesOptions"
                :invalid="Boolean(errors.specieId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
                @update:model-value="searchServicesDebounced"
                showClear
                filter
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- headquarter -->
            <div v-if="roleMain === 'Administrador'">
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                showClear
                v-model="headquarterIdSelected"
                @update:model-value="loadData"
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
            <Column
              field="name"
              sortable
              header="Servicio"
              style="width: 18%"
            ></Column>
            <Column v-for="(headquarter, index) in headquarters" :key="headquarter.id">
              <template #header>
                <div class="p-datatable-column-title w-full text-center">
                  {{ `Sede ${headquarter.name}` }}
                </div>
              </template>
              <template #body="{ data }">
                <template
                  v-if="
                    headquarterServiceAux = headquarterServices[index]?.find(
                      (s) => s.service.id === data.serviceId,
                    )
                  "
                >
                  <div class="flex items-center flex-col justify-center gap-4">
                    <div class="w-full flex items-center gap-2 justify-center">
                      <ToggleSwitch v-if="headquarterServiceAux.status" readonly v-model="activedHeadquarterService" />
                        <ToggleSwitch v-else readonly v-model="inanctivedHeadquarterService" />
                      <i v-if="headquarterServiceAux.status" class="pi pi-check text-green-500 dark:text-green-400"></i>
                      <i v-else class="pi pi-times text-red-500 dark:text-red-400"></i>
                    </div>
                    <Button
                      icon="pi pi-pen-to-square"
                      severity="secondary"
                      variant="outlined"
                      class="p-1.5"
                      aria-label="Editar"
                      size="small"
                      @click="
                        editHeadquarterService(
                          findHeadquarterVetService(headquarter.id, data.serviceId),
                        )
                      "
                    ></Button>
                  </div>
                </template>
                <template v-else>
                  <div class="flex items-center flex-col justify-center gap-2">
                    <p lass="text-neutral-500">No disponible</p>
                    <Button
                      icon="pi pi-plus"
                      severity="secondary"
                      variant="outlined"
                      class="p-1.5"
                      aria-label="Editar"
                      size="small"
                      @click="addHeadquarterService(headquarter, data)"
                    ></Button>
                  </div>
                </template>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
