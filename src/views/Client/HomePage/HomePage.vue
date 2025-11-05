<script setup lang="ts">
import Card from 'primevue/card'
import CardAppointmentPrimary from '@/components/CardAppointmentPrimary.vue'
import ScrollPanel from 'primevue/scrollpanel'

import CardPetPrimary from '@/components/CardPetPrimary.vue'
import CardServicePrimary from '@/components/CardServicePrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import { RouterLink, useRouter } from 'vue-router'
import { useClient } from '@/composables/useClient'
import { useAppointment } from '@/composables/useAppointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import Button from 'primevue/button'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import type { OptionSelect } from '@/models/OptionSelect'
import type { HeadquarterServiceInfoPanel } from '@/models/HeadquarterServiceInfoPanel'
import { useSpecie } from '@/composables/useSpecie'
import { useCategory } from '@/composables/useCategory'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
import type { Category } from '@/models/Category'
import type { Specie } from '@/models/Specie'
import { schema } from '@/validation-schemas-forms/schema-search-headquarter-service'
import type { FormValues as SearchHeadServiceSchema } from '@/validation-schemas-forms/schema-search-headquarter-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useDialog, type DataViewPageEvent } from 'primevue'
import { debounce } from 'lodash'
import DataView from 'primevue/dataview'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import CardHeadquarterService from '@/components/CardHeadquarterService.vue'
//methods
const { getEntityId } = useAuthentication()
const { error: petError, loading: petLoading, getPetByClientId } = usePet()

const {
  error: appointmentError,
  loading: appointmentLoading,
  getAppointmentsForClient,
} = useAppointment()

const { myInfoAsClient } = useClient()

const namesAndLastnames = ref<{ name: string; lastnames: string }>({
  name: '',
  lastnames: '',
})

const headquarterIdForClient = ref<number | undefined>(undefined)

//example for pet cards
const pets = ref<PetByClient[]>([])
const appointments = ref<InfoBasicAppointmentClient[]>([])
//get all for view
onMounted(async () => {
  await loadInfoClient()
  await loadPets()
  await loadAppointments()
  await loadHeadquarterService()
})

const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}

const loadInfoClient = async () => {
  const clientId = getEntityId()
  if (clientId) {
    const infoClient = await myInfoAsClient(clientId)
    namesAndLastnames.value = {
      name: infoClient.names,
      lastnames: infoClient.lastnames,
    }
    const headquarterIdGet = infoClient.headquarter.id
    headquarterIdForClient.value = headquarterIdGet
    headquarterId.value = headquarterIdGet
  }
  headquarterOptions.value = headquartersCategoriesSpeciesToOptionsSelect(
    await getAllHeadquarters(),
  )
  categoriesOptions.value = headquartersCategoriesSpeciesToOptionsSelect(await getAllCategories())
  speciesOptions.value = headquartersCategoriesSpeciesToOptionsSelect(await getAllSpecies())
}

const loadAppointments = async () => {
  const clientId = getEntityId()
  if (clientId) {
    appointments.value = await getAppointmentsForClient(clientId)
  }
}

const router = useRouter()
const redirect = (url: string) => {
  router.push(url)
}

//for service

const { filterHeadquarterVetServices } = useHeadquarterVetService()

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

const headquarterOptions = ref<OptionSelect[]>([])

const headquatersVetServices = ref<HeadquarterServiceInfoPanel[]>([])

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

const { getAllHeadquarters } = useHeadquarter()

const {} = useHeadquarterVetService()

//form search
const { errors, defineField } = useForm<SearchHeadServiceSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    categoryId: undefined,
    headquarterId: undefined,
  },
})

const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')

const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')

const headquartersCategoriesSpeciesToOptionsSelect = (
  items: Headquarter[] | Category[] | Specie[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

const loadHeadquarterService = async (event?: DataViewPageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const response = await filterHeadquarterVetServices(page, size, {
    serviceName: name.value,
    categoryId: categoryId.value ?? undefined,
    speciesId: specieId.value ?? undefined,
    headquarterId: headquarterId.value ?? undefined,
  })

  headquatersVetServices.value = response.content
  totalRecords.value = response.totalElements
}
const searchHeadquartersDebounced = debounce(() => {
  loadHeadquarterService()
}, 400)

//paginator

const totalRecords = ref<number>(0)
const rows = ref<number>(4)
const first = ref<number>(0)

const dialog = useDialog()

const viewHeadquarterService = (headquarterService: HeadquarterServiceInfoPanel) => {
  dialog.open(CardHeadquarterService, {
    props: {
      modal: true,
      header: headquarterService.serviceName,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquarterServiceInfo: headquarterService,
    },
  })
}

const redirectToAppointmentUnitary = (appointmentId: number) => {
  router.push(`/client/my-appointments/appointment/${appointmentId}`)
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          !Hola
          <strong> {{ namesAndLastnames.name }} {{ namesAndLastnames.lastnames }} </strong>! 👋
        </h2>
      </template>
      <template #subtitle>
        <p class="textLg">Bienvenido al portal de Veterinaria Reyes</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
          <!-- apointments -->
          <Card class="card-primary">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h3>Citas Programadas</h3>
                <Button
                  label="Nueva Cita"
                  @click="redirect('/client/my-appointments/schedule-appointment')"
                  icon="pi pi-plus"
                  size="small"
                >
                </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Sus proximas citas</p>
            </template>
            <template #content>
              <ScrollPanel v-if="appointments.length > 0" class="h-96 pr-4">
                <div class="flex flex-col gap-2">
                  <!-- for messague loading  -->
                  <Message
                    v-if="appointmentLoading.getAppointmentsForClient"
                    severity="warn"
                    size="small"
                    variant="simple"
                  >
                    Cargando ...
                  </Message>
                  <!-- for messague error -->
                  <Message
                    v-if="appointmentError.getAppointmentsForClient"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    Error al cargar tus citas
                  </Message>
                  <CardAppointmentPrimary
                    v-for="appointment in appointments"
                    :key="appointment.id"
                    :appointmentId="appointment.id"
                    :serviceImageUrl="appointment.service.image"
                    :serviceName="appointment.service.name"
                    :petName="appointment.pet.name"
                    :date="appointment.date"
                    :time="appointment.time"
                    :headquarter-name="appointment.headquarter.name"
                    :headquarter-address="appointment.headquarter.address"
                    v-ripple
                    class="cursor-pointer"
                    @click="redirectToAppointmentUnitary(appointment.id)"
                  ></CardAppointmentPrimary>
                </div>
              </ScrollPanel>
              <div class="h-96 w-full flex items-center justify-center" v-else>
                <p>No tiene citas agendadas</p>
              </div>
            </template>
          </Card>

          <!-- pets -->
          <Card class="card-primary">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h3>Mis Mascotas</h3>
                <Button
                  label="Ver todas"
                  @click="redirect('/client/my-pets')"
                  variant="outlined"
                  size="small"
                >
                </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Datos de tus engreidos</p>
            </template>
            <template #content>
              <ScrollPanel v-if="pets.length > 0" class="h-96 pr-4">
                <div class="flex flex-col gap-2">
                  <!-- for messague loading  -->
                  <Message
                    v-if="petLoading.getPetByClientId"
                    severity="warn"
                    size="small"
                    variant="simple"
                  >
                    Cargando ...
                  </Message>
                  <!-- for messague error -->
                  <Message
                    v-if="petError.getPetByClientId"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    Error al cargar tus mascotas
                  </Message>
                  <RouterLink v-for="pet in pets" :key="pet.id" :to="`/client/my-pets/${pet.id}`">
                    <CardPetPrimary
                      v-ripple
                      :key="pet.id"
                      :petId="pet.id"
                      :petImageUrl="pet.urlImage"
                      :petName="pet.name"
                      :petSpecie="pet.specieName"
                      :petBreed="pet.breedName"
                      :petGender="pet.gender"
                      :birthdate="pet.birthdate"
                    ></CardPetPrimary
                  ></RouterLink>
                </div>
              </ScrollPanel>
              <div class="h-96 w-full flex items-center justify-center" v-else>
                <p>No tiene masctotas registradas</p>
              </div>
            </template>
          </Card>
        </div>
        <!-- services -->
        <Card class="card-primary mt-4">
          <template #title>
            <h3>Servicios disponibles</h3>
          </template>

          <template #subtitle>
            <p>Conoce los servicios que tenemos disponibles para el cuadado de tus mascotas</p>
          </template>
          <template #content>
            <div class="flex flex-col w-full">
              <div class="flex flex-col lg:flex-row w-full justify-end gap-2">
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-search"></i>
                  </InputGroupAddon>
                  <InputText
                    v-model="name"
                    v-bind="nameAttrs"
                    placeholder="Busque un servicio ..."
                    @update:model-value="searchHeadquartersDebounced"
                  />
                </InputGroup>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 min-w-max text-sm">
                  <Select
                    v-bind="categoryIdAttrs"
                    v-model="categoryId"
                    :options="categoriesOptions"
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Categoria"
                    showClear
                    @update:model-value="searchHeadquartersDebounced"
                  ></Select>
                  <Select
                    v-bind="specieIdAttrs"
                    v-model="specieId"
                    optionLabel="name"
                    optionValue="value"
                    :options="speciesOptions"
                    placeholder="Especie"
                    showClear
                    @update:model-value="searchHeadquartersDebounced"
                  ></Select>
                  <Select
                    v-bind="headquarterIdAttrs"
                    v-model="headquarterId"
                    optionLabel="name"
                    optionValue="value"
                    :options="headquarterOptions"
                    placeholder="Sede"
                    showClear
                                     class=" col-span-2 md:col-span-1"
                    @update:model-value="searchHeadquartersDebounced"
                  ></Select>
                </div>
                <Message v-if="errors.name" severity="error" size="small" variant="simple">
                  {{ errors.name }}
                </Message>
              </div>
              <!-- for messague error -->
              <Message
                v-if="appointmentError.getServicesByHeadquarterAndSpecies"
                severity="error"
                size="small"
                variant="simple"
              >
                Error al cargar los servicios
              </Message>
              <DataView
                lazy
                :rows="rows"
                :first="first"
                :totalRecords="totalRecords"
                :rows-per-page-options="[4, 8, 12]"
                :value="headquatersVetServices"
                paginator
                data-key="headquarterId"
                @page="loadHeadquarterService"
              >
                <template #list="slotProps">
                  <div
                    class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-12 gap-y-6 my-4"
                  >
                    <CardServicePrimary
                      v-ripple
                      v-for="(item, index) in slotProps.items"
                      :key="index"
                      :service-id="item.serviceId"
                      :service-name="item.serviceName"
                      :service-image-url="item.serviceImageUrl"
                      :specie-name="item.specieName"
                      :category-name="item.categoryName"
                      :duration="item.serviceDuration"
                      :price="item.servicePrice"
                      :headquarter-name="item.headquarterName"
                      @click="viewHeadquarterService(item)"
                    />
                  </div>
                </template>
              </DataView>
            </div>
          </template>
          <template #footer>
            <Button hidden
              class="w-full"
              size="small"
              iconPos="right"
              icon="pi pi-arrow-right"
              variant="text"
              label="Ver todos los servicios"
            />
          </template>
        </Card>
      </template>
    </Card>
  </div>
</template>
