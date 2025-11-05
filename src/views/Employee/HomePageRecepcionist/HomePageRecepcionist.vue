<script lang="ts" setup>
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppointmentQuaternary from '@/components/CardAppointmentQuaternary.vue'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import CardServiceTerciary from '@/components/CardServiceTerciary.vue'
import CardClientWaiting from '@/components/CardClientWaiting.vue'
import CardPaymentPrimary from '@/components/CardPaymentPrimary.vue'
import { useAppointment } from '@/composables/useAppointment'
import type { AppointmentStatsForReceptionist } from '@/services/Appointment/domain/models/Appointment'
import { useClient } from '@/composables/useClient'
import type { ClientStatsToday } from '@/services/Client/domain/models/Client'
import type { CareStatsToday } from '@/services/Care/domain/models/Care'
import { useCare } from '@/composables/useCare'
import type { IncomeStatsToday } from '@/services/Payment/domain/models/Payment'
import { usePayment } from '@/composables/usePayment'
import type { CareAndAppointmentPanelEmployee } from '@/models/CareAndAppointmentPanelEmployee'
import type { RecentPayment } from '@/models/RecientPayment'
import { useRouter } from 'vue-router'
import ScrollPanel from 'primevue/scrollpanel'
import Message from 'primevue/message'
import type { Headquarter } from '@/models/Headquarter'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { OptionSelect } from '@/models/OptionSelect'
import { useSpecie } from '@/composables/useSpecie'
import { useCategory } from '@/composables/useCategory'
import type { Category } from '@/models/Category'
import type { Specie } from '@/models/Specie'
import DataView from 'primevue/dataview'
import { schema } from '@/validation-schemas-forms/schema-search-headquarter-service'
import type { FormValues as SearchHeadServiceSchema } from '@/validation-schemas-forms/schema-search-headquarter-service'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'

import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import { useDialog, type DataViewPageEvent } from 'primevue'
import { debounce } from 'lodash'
import type { HeadquarterServiceInfoPanel } from '@/models/HeadquarterServiceInfoPanel'
import CardHeadquarterService from '@/components/CardHeadquarterService.vue'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const { getAppointmentsByHeadquarterId, getStatsForReceptionist } = useAppointment()

const { getRecentCompletedPayments, getTodayIncomeStats } = usePayment()

const { getClientStatsToday } = useClient()

const { getCareStatsToday } = useCare()

const { getCaresByHeadquarterId } = useCare()

const { filterHeadquarterVetServices } = useHeadquarterVetService()

const paymentsRecent = ref<RecentPayment[]>([])

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const carePending = ref<CareAndAppointmentPanelEmployee[]>([])

const appointmentsTotayStats = ref<AppointmentStatsForReceptionist | null>(null)

const todayAppointments = ref<CareAndAppointmentPanelEmployee[]>([])

const paymentStatsToday = ref<IncomeStatsToday | null>(null)

const clientStatsToday = ref<ClientStatsToday | null>()

const careStatsToday = ref<CareStatsToday | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

const headquarterOptions = ref<OptionSelect[]>([])

const headquatersVetServices = ref<HeadquarterServiceInfoPanel[]>([])

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

const { getAllHeadquarters } = useHeadquarter()

const {} = useHeadquarterVetService()

onMounted(() => {
  loadMyInfo()
})

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
    headquarterId.value = myInfoEmployee.value.headquarter.id
  }

  clientStatsToday.value = await getClientStatsToday()

  paymentStatsToday.value = await getTodayIncomeStats()
  if (myInfoEmployee.value) {
    const headquarterId = myInfoEmployee.value.headquarter.id
    careStatsToday.value = await getCareStatsToday(headquarterId)
    appointmentsTotayStats.value = await getStatsForReceptionist(headquarterId)

    todayAppointments.value = await getAppointmentsByHeadquarterId(headquarterId)
    carePending.value = await getCaresByHeadquarterId(headquarterId)
    paymentsRecent.value = await getRecentCompletedPayments(headquarterId)
  }
  headquarterOptions.value = headquartersCategoriesSpeciesToOptionsSelect(
    await getAllHeadquarters(),
  )
  categoriesOptions.value = headquartersCategoriesSpeciesToOptionsSelect(await getAllCategories())
  speciesOptions.value = headquartersCategoriesSpeciesToOptionsSelect(await getAllSpecies())
  loadHeadquarterService()
}

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

const router = useRouter()
const redirect = (name: string) => {
  router.push({ name: name })
}

const redirectToAddAppointment = () => {
  router.push({ name: 'receptionist-appointment-management', query: { add: '1' } })
}

const redirectToAddCare = () => {
  router.push({ name: 'receptionist-care-management', query: { add: '1' } })
}


const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

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
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          Bienvenido
          <strong> {{ myInfoEmployee?.names }} </strong>
        </h2>
      </template>
      <template #subtitle>
        <p class="textLg">{{ today }}</p>
      </template>
      <template #content>
        <!-- news -->
        <div class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4">
          <CardNewsPrimary
            v-if="appointmentsTotayStats"
            title="Citas hoy"
            icon="pi-calendar"
            :content="appointmentsTotayStats.totalAppointmentsToday.toString()"
            :plus="`${appointmentsTotayStats.confirmedAppointmentsToday} confirmada, ${appointmentsTotayStats.pendingAppointmentsToday} pendientes`"
          >
          </CardNewsPrimary>
          <CardNewsPrimary
            v-if="clientStatsToday"
            title="Clientes atendidos"
            icon="pi-users"
            :content="clientStatsToday.todayClientsAttended.toString()"
            :plus="`+${clientStatsToday.totalClientsAttended - clientStatsToday.todayClientsAttended} desde ayer`"
          ></CardNewsPrimary>

          <CardNewsPrimary
            v-if="careStatsToday"
            title="Atenciones registradas"
            icon="pi-users"
            :content="careStatsToday.todayCares.toString()"
            :plus="`+${careStatsToday.totalCares - careStatsToday.todayCares} desde ayer`"
          ></CardNewsPrimary>

          <CardNewsPrimary
            v-if="careStatsToday"
            title="Ingresos hoy"
            icon="pi-chart-line"
            :content="`S/ ${careStatsToday.todayCares.toString()}`"
          ></CardNewsPrimary>
        </div>
        <!-- quicky actions -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <p>Acciones rápidas</p>
          </template>
          <template #subtitle>
            <p>Funciones utilizadas frecuentemente</p>
            <div
              class="grid grid-cols-1 xs:grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-2"
            >
              <Button
                label="Nueva cita"
                iconPos="top"
                icon="pi pi-plus"
                @click="redirectToAddAppointment"
              ></Button>
              <Button
                label="Buscar cliente"
                variant="outlined"
                iconPos="top"
                icon="pi pi-search"
                severity="secondary"
                @click="redirect('receptionist-client-management')"
              ></Button>
              <Button
                label="Registrar atención"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-clipboard"
                @click="redirectToAddCare"
              ></Button>
              <Button
                label="Procesar pago"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-credit-card"
                @click="redirect('receptionist-payment-management')"
              ></Button>
            </div>
          </template>
        </Card>
        <!-- section 2 -->
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Citas de Hoy</h2>
                <Tag
                  :value="`${todayAppointments.length} citas`"
                  severity="secondary"
                  class="self-start"
                ></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Agenda completa del dia</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <ScrollPanel v-if="todayAppointments.length > 0" class="h-56">
                  <CardAppointmentQuaternary
                    v-for="(appointment, index) of todayAppointments"
                    :key="index"
                    :pet-name="appointment.pet.name"
                    :service-name="appointment.serviceName"
                    :owner-name="appointment.clientName"
                    :time="appointment.hour"
                    :status="appointment.status"
                    :employee-name="''"
                    :pet-breed="''"
                  >
                  </CardAppointmentQuaternary>
                </ScrollPanel>
                <div
                  class="flex min-h-44 max-h-56 items-center justify-center"
                  v-if="todayAppointments.length === 0"
                >
                  <p>No citas que mostrar</p>
                </div>
              </div>
            </template>
            <template #footer>
              <Button
                label="Ver todas las citas"
                variant="text"
                icon="pi pi-eye"
                size="small"
                class="mt-2 w-full"
                @click="redirect('receptionist-appointment-management')"
              >
              </Button>
            </template>
          </Card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12">
            <!-- waiting room -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Sala de espera</h2>
                  <Tag
                    :value="`${carePending.length} esperando`"
                    severity="secondary"
                    class="self-start"
                  ></Tag>
                </div>
              </template>
              <template #subtitle>
                <p>Clientes en espera</p>
              </template>
              <template #content>
                <ScrollPanel v-if="carePending.length > 0" class="h-56">
                  <div class="w-full flex flex-col gap-1">
                    <CardClientWaiting
                      v-for="(client, index) of carePending"
                      :key="index"
                      :clientName="client.clientName"
                      :petName="client.pet.name"
                      :serviceName="client.serviceName"
                    ></CardClientWaiting></div
                ></ScrollPanel>
                <div
                  class="flex min-h-44 max-h-56 items-center justify-center"
                  v-if="carePending.length === 0"
                >
                  <p>No atenciones que mostrar</p>
                </div>
              </template>
            </Card>
            <!-- payments -->

            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Ultimos pagos</h2>
                  <Tag
                    :value="`${paymentsRecent.length} pagos`"
                    severity="secondary"
                    class="self-start"
                  ></Tag>
                </div>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-1">
                  <ScrollPanel v-if="paymentsRecent.length > 0" class="h-64"
                    ><!-- key -->
                    <div class="w-full flex flex-col gap-1">
                      <CardPaymentPrimary
                        v-for="(payment, index) in paymentsRecent"
                        :key="index"
                        :clientName="payment.clientFullName"
                        :petName="payment.petName"
                        :serviceName="payment.serviceName"
                        clientDni=""
                        :date="payment.paymentDate || ''"
                        :time="payment.paymentTime || ''"
                        :amount="payment.amount"
                        :status="payment.paymentStatus"
                      />
                    </div>
                  </ScrollPanel>
                  <div
                    class="flex min-h-44 max-h-56 items-center justify-center"
                    v-if="paymentsRecent.length === 0"
                  >
                    <p>No pagos que mostrar</p>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <!-- for services -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <div class="w-full flex items-center gap-2">
              <i class="pi pi-search text-primary"></i>
              <h2 class="h3 font-semibold">Catalogo de servicios</h2>
            </div>
          </template>
          <template #subtitle>
            <p>Busque y filtre servicios para agendar citas</p>
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
                    class=" col-span-2 md:col-span-1"
                    showClear
                    @update:model-value="searchHeadquartersDebounced"
                  ></Select>
                </div>
                <Message v-if="errors.name" severity="error" size="small" variant="simple">
                  {{ errors.name }}
                </Message>
              </div>
              <!-- services cards -->
              <DataView
                lazy
                :rows="rows"
                :first="first"
                :totalRecords="totalRecords"
                :rows-per-page-options="[10, 15, 20]"
                :value="headquatersVetServices"
                paginator
                data-key="headquarterId"
                @page="loadHeadquarterService"
              >
                <template #list="slotProps">
                  <div
                    class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-12 gap-y-6 my-4"
                  >
                    <CardServiceTerciary
                      class="cursor-pointer"
                      v-ripple
                      v-for="(item, index) in slotProps.items"
                      :key="index"
                      :serviceId="item.serviceId"
                      :serviceName="item.serviceName"
                      :serviceImageUrl="item.serviceImageUrl"
                      :specieName="item.specieName"
                      :categoryName="item.categoryName"
                      :duration="item.serviceDuration"
                      :price="item.servicePrice"
                      :headquarter-name="item.headquarterName"
                      @click="viewHeadquarterService(item)"
                    >
                    </CardServiceTerciary>
                  </div>
                </template>
              </DataView>
            </div>
          </template>
        </Card>
      </template>
    </Card>
  </div>
</template>
