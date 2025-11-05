<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-breed'
import type { FormValues as SearchBreedSchema } from '@/validation-schemas-forms/schema-search-breed'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import AddEditBreedCard from './components/AddEditBreedCard.vue'
import { useDialog, useToast } from 'primevue'
import type { BreedList } from '@/models/BreedList'
import type { FormValues as AddEditBreedSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import { useConfirm } from 'primevue'
import { useBreed } from '@/composables/useBreed'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Specie } from '@/models/Specie'
import { useSpecie } from '@/composables/useSpecie'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
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

//get from compose

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

const {
  loading,
  error,
  deleteBreed,
  getBreedByUd,
  createBreed,
  updateBreed,
  activateBreed,
  searchBreeds,
} = useBreed()

const typedError = error as Record<string, string | null>

const { getAllSpecies } = useSpecie()

const breeds = ref<BreedList[]>([])

const speciesOptions = ref<OptionSelect[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)
const searchBreedsDebounced = debounce(() => loadBreeds(), 400)

onMounted(async () => {
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  await loadBreeds()
  const role = getMainRole()
  if (role) {
    roleMain.value = role
  }
})

//for load breeds

const loadBreeds = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const specieName = speciesOptions.value.find((s) => s.value === specieId.value)?.name || undefined

  const response = await searchBreeds({
    page,
    size,
    name: name.value,
    specieName,
    status: status.value,
  })

  breeds.value = response.content
  totalRecords.value = response.totalElements
}

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

//form
const {resetForm,handleSubmit, errors, defineField } = useForm<SearchBreedSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadBreeds()
}

const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [status, statusAttrs] = defineField('status')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

const addBreed = () => {
  dialog.open(AddEditBreedCard, {
    props: {
      modal: true,
      header: 'Agregar raza',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      speciesOptions: speciesOptions,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditBreedSchema
      if (data) {
        try {
          const breed = await createBreed(data)
          console.log('Datos recibidos', breed)
          loadBreeds()
          showToast('Raza agregada exitosamente: ' + breed.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if(typedError.createBreed){
            showToast('Error al crear la raza: ' + data.name + typedError.createBreed, 'warn', 'Error')
          } else {
            showToast('Error al crear la raza', 'warn', 'Error')
          }
        }
      }
    },
  })
}

const editBreed = async (breedData: BreedList) => {
  const breed = await getBreedByUd(breedData.id)
  dialog.open(AddEditBreedCard, {
    props: {
      modal: true,
      header: `${breedData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      breedData: {
        name: breed.name,
        specieId: breed.specie.id,
      } as AddEditBreedSchema,
      speciesOptions: speciesOptions,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditBreedSchema
      if (data) {
        try {
          const breed = await updateBreed(breedData.id, data)
          console.log('Datos recibidos', breed)
          loadBreeds()
          showToast('Raza editada exitosamente: ' + breed.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updateBreed) {
            showToast('Error al editar la raza: ' + data.name + typedError.updateBreed, 'warn', 'Error')
          } else {
            showToast('Error al editar la raza', 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const handleDeleteReactiveBreed = (event: MouseEvent | KeyboardEvent, breedData: BreedList) => {
  const isActive = breedData.status

  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: isActive
      ? '¿Seguro que quiere eliminar esta raza?'
      : '¿Seguro que quiere reactivar esta raza?',
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
        await deleteBreed(breedData.id)
        showToast('Raza eliminada exitosamente: ' + breedData.name, 'success', 'Éxito')
      } else {
        await activateBreed(breedData.id)
        showToast('Raza reactivada exitosamente: ' + breedData.name, 'success', 'Éxito')
      }

      loadBreeds()
    },
    reject: () => {
      console.log('Acción cancelada')
    },
  })
}

//for export


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
</script>

<template>
  <div class="layout-principal-flex">
        <CardLoader
          v-if="loading.activateBreed || loading.updateBreed || loading.createBreed || loading.deleteBreed"
        ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión razas</h3>
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
                  @update:model-value="searchBreedsDebounced"
                  class="w-full"
                  placeholder="Nombre"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Especie</label>
              <Select
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="speciesOptions"
                :invalid="Boolean(errors.specieId)"
                @update:model-value="searchBreedsDebounced"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
                showClear
                filter
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
                @update:model-value="searchBreedsDebounced"
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
          <Message v-if="loading.getAllBreeds" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllBreeds" severity="error" size="small" variant="simple">
            Error al cargar las categorias
          </Message>

          <!-- table -->
          <DataTable
            :value="breeds"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchBreeds"
            :rows-per-page-options="[5, 10, 15, 20]"
            @page="loadBreeds"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Raza"
                  @click="addBreed"
                />

              </div>
            </template>
            <Column field="name" sortable header="Nombre" style="width: 40%"></Column>
            <Column
              sortable
              header="Especie"
              field="specieName"
              style="width: 30%"
              class="hidden xs:table-cell"
            >
            </Column>
            <Column v-if="roleMain === 'Administrador'" header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-row xs:flex-col lg:flex-row gap-1">
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                    @click="editBreed(data)"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    size="small"
                    aria-label="Bloquear"
                    rounded
                    v-if="data.status === 'Activo' && roleMain === 'Administrador'"
                    @click="handleDeleteReactiveBreed($event, data)"
                  />

                  <Button
                    v-if="data.status === 'Inactivo' && roleMain === 'Administrador'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="handleDeleteReactiveBreed($event, data)"
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
