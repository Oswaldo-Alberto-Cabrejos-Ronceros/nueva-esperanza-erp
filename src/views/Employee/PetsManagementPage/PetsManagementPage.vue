<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-pet'
import type { FormValues as SearchEmployeeSchema } from '@/validation-schemas-forms/schema-search-pet'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useConfirm } from 'primevue'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import type { Pet } from '@/models/Pet'
import { onMounted, ref } from 'vue'
import { useDialog, useToast } from 'primevue'
import AddEditPetCard from './components/AddEditPetCard.vue'
import type { FormValues as AddEditPetSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import { useRoute, useRouter } from 'vue-router'
import { usePet } from '@/composables/usePet'
import { useSpecie } from '@/composables/useSpecie'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Specie } from '@/models/Specie'
import type { Breed } from '@/models/Breed'
import { useBreed } from '@/composables/useBreed'
import type { PetList } from '@/models/PetList'
import { debounce } from 'lodash'
import { useClient } from '@/composables/useClient'
import type { Client } from '@/models/Client'
import { watch } from 'vue'
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

const { loading, error, searchPets, createPet, getPetById, updatePet, deletePet, activatePet } =
  usePet()

const typedError = error as Record<string, string | null>

const { getMainRole } = useAuthentication()

const { getAllSpecies } = useSpecie()

const { getBreedsBySpecie } = useBreed()

const { getClientById } = useClient()

const speciesOptions = ref<OptionSelect[]>([])

const breedsOptions = ref<OptionSelect[]>([])

const species = ref<Specie[]>([])

//pets
const pets = ref<PetList[]>([])

const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

const mainRole = ref<string | null>('')

onMounted(async () => {
  loadPets()
  const role = getMainRole()
  if (role != null) mainRole.value = getMainRole()
})

const searchPetsDebounce = debounce(() => {
  loadPets()
})

//for load pets
const loadPets = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchPets({
    name: textFields.name[0].value,
    owner: textFields.ownerDni[0].value,
    specie: specie.value,
    breed: breed.value,
    gender: gender.value,
    status: status.value,
    page: page,
    size: size,
  })

  pets.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
  species.value = await getAllSpecies()
  speciesOptions.value = speciesNameToOptionsSelect(species.value)
  loadsBreed()
}

const loadsBreed = async () => {
  //find breed

  if (specie.value) {
    const specieFind = findSpecieByName(specie.value)
    if (specieFind) {
      breedsOptions.value = breedsNameToOptionsSelect(await getBreedsBySpecie(specieFind.id))
    }
  }
}

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

//for find by name

const findSpecieByName = (name: string): Specie | undefined => {
  return species.value.find((specie) => specie.name === name)
}

//for species to options Select
const speciesNameToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.name,
    name: specie.name,
  }))
}

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

// for breeds to optionSelect

const breedsNameToOptionsSelect = (breeds: Breed[]): OptionSelect[] => {
  return breeds.map((breed) => ({
    value: breed.name,
    name: breed.name,
  }))
}

//form

const { resetForm, errors, defineField } = useForm<SearchEmployeeSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    ownerDni: '',
    specie: undefined,
    breed: undefined,
    gender: undefined,
    status: true,
  },
})

const textFields = {
  name: defineField('name'),
  ownerDni: defineField('ownerDni'),
}

const handleResetForm = () => {
  resetForm()
  loadPets()
}

//for selects field

const [specie, specieAttrs] = defineField('specie')
const [breed, breedAttrs] = defineField('breed')
const [gender, genderAttrs] = defineField('gender')
const [status, statusAttrs] = defineField('status')

const searchTextElementsClient: { title: string; key: keyof typeof textFields; icon: string }[] = [
  {
    title: 'Nombre',
    key: 'name',
    icon: 'fa-solid fa-paw',
  },
  {
    title: 'Dueño',
    key: 'ownerDni',
    icon: 'pi pi-user',
  },
]

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

//for dialog
const dialog = useDialog()

//for add
const addPet = async () => {
  dialog.open(AddEditPetCard, {
    props: {
      modal: true,
      header: 'Agregar mascota',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPetSchema
      if (data) {
        try {
          await createPet(data)
          loadPets()
          showToast('Mascota agregada exitosamente: ' + data.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.createPet) {
            showToast(
              'Error al agregar la mascota: ' + data.name + typedError.createPet,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al agregar la mascota' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

const router = useRouter()
const route = useRoute()
//for view
const viewPet = (petData: PetList) => {
  router.push(`${route.fullPath}/pet/${petData.id}`)
}

const editPet = async (petData: PetList) => {
  const pet: Pet = await getPetById(petData.id)
  const client = ref<Client | null>(null)
  console.log(client)
  if (pet.clientId) {
    client.value = await getClientById(pet.clientId)
  }
  dialog.open(AddEditPetCard, {
    props: {
      modal: true,
      header: `${petData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      petData: {
        name: pet.name,
        gender: pet.gender,
        weight: pet.weight,
        birthdate: new Date(pet.birthdate),
        comment: pet.comment,
        specieId: pet.specie.id,
        breedId: pet.breed.id,
        urlImage: pet.urlImage,
        ownerDni: client.value ? client.value?.dni : '',
        ownerId: pet.clientId,
        ownerFullName: client.value ? ` ${client.value.names} ${client.value.lastnames}` : '',
      } as AddEditPetSchema,
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPetSchema
      if (data) {
        try {
          await updatePet(petData.id, data)
          loadPets()
          showToast('Mascota editada exitosamente: ' + data.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updatePet) {
            showToast(
              'Error al editar la mascota: ' + data.name + typedError.updatePet,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al editar la mascota: ' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const confirmDeletePet = (event: MouseEvent | KeyboardEvent, pet: PetList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere bloquear a esta mascota?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Bloquear',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Eliminando mascota: ', pet.id)
      await deletePet(pet.id) // esta es la que viene de usePet()
      loadPets()
      showToast('Mascota eliminada exitosamente: ' + pet.name, 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando eliminación')
    },
  })
}

//for active pet

const confirmActivatePet = (event: MouseEvent | KeyboardEvent, pet: PetList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que desea activar esta mascota?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Activar',
      severity: 'success',
    },
    accept: async () => {
      console.log('Activando mascota: ', pet.id)
      await activatePet(pet.id)
      loadPets()
      showToast('Mascota activada exitosamente: ' + pet.name, 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando activación')
    },
  })
}

//for export

//for watch specieId

watch(
  () => specie.value,
  (newValue) => {
    if (newValue === null) {
      breed.value = undefined
      breedsOptions.value = []
    }
  },
)
</script>

<template>
  <div class="layout-principal-flex">
    <CardLoader
      v-if="loading.activatePet || loading.deletePet || loading.updatePet || loading.createPet"
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de mascotas</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form class="form-search-grid-col-5">
            <div v-for="element in searchTextElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="textFields[element.key][0].value"
                  v-bind="textFields[element.key][1]"
                  :invalid="Boolean(errors[element.key])"
                  class="w-full"
                  showClear
                  :placeholder="element.title"
                  @update:model-value="searchPetsDebounce()"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>
            <div>
              <label class="block mb-2">Especie</label>
              <Select
                filter
                class="w-full"
                v-bind="specieAttrs"
                v-model="specie"
                :invalid="Boolean(errors.specie)"
                :options="speciesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
                showClear
                @update:modelValue="
                  () => {
                    loadsBreed()
                    searchPetsDebounce()
                  }
                "
              />
            </div>
            <div>
              <label class="block mb-2">Raza</label>
              <Select
                filter
                class="w-full"
                v-bind="breedAttrs"
                v-model="breed"
                :options="breedsOptions"
                :invalid="Boolean(errors.breed)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Raza"
                showClear
                @update:model-value="searchPetsDebounce()"
              />
            </div>
            <div>
              <label class="block mb-2">Sexo</label>
              <Select
                class="w-full"
                v-bind="genderAttrs"
                v-model="gender"
                :invalid="Boolean(errors.gender)"
                :options="genders"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sexo"
                showClear
                @update:model-value="searchPetsDebounce()"
              />
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
                @update:model-value="searchPetsDebounce()"
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
          <Message v-if="loading.getAllPets" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllPets" severity="error" size="small" variant="simple">
            Error al cargar las mascotas
          </Message>

          <!-- table -->
          <DataTable
            :value="pets"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchPets"
            @page="loadPets"
            scrollable
            removableSort
            :rows-per-page-options="[1, 2, 3, 4]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Mascota"
                  @click="addPet"
                  v-if="mainRole !== 'Veterinario'"
                />
              </div>
            </template>
            <Column field="name" sortable style="width: 18%" header="Nombre"></Column>
            <Column field="owner" sortable header="Dueño" style="width: 18%"></Column>
            <Column field="specie" header="Especie" sortable style="width: 15%"> </Column>
            <Column field="breed" sortable style="width: 15%" header="Raza"> </Column>
            <Column field="gender" sortable style="width: 15%" header="Sexo"></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    size="small"
                    aria-label="Ver"
                    rounded
                    @click="viewPet(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                    @click="editPet(data)"
                    v-if="mainRole !== 'Veterinario'"
                  ></Button>
                  <Button
                    v-if="data.status === 'Activo' && mainRole !== 'Veterinario'"
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    size="small"
                    aria-label="Bloquear"
                    rounded
                    @click="confirmDeletePet($event, data)"
                  ></Button>
                  <Button
                    v-if="data.status === 'Inactivo' && mainRole !== 'Veterinario'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Activar"
                    rounded
                    @click="confirmActivatePet($event, data)"
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
