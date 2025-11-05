<script setup lang="ts">
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppintmentTerciary from '@/components/CardAppintmentTerciary.vue'
import ServiceRankingItem from '@/components/ServiceRankingItem.vue'
import ClientRankingItem from '@/components/ClientRankingItem.vue'
import Chart from 'primevue/chart'
import { useAppointment } from '@/composables/useAppointment'
import type { AppointmentStatsToday } from '@/services/Appointment/domain/models/Appointment'
import { usePayment } from '@/composables/usePayment'
import type {
  PaymentStatsForPanelAdmin,
  WeeklyIncome,
} from '@/services/Payment/domain/models/Payment'
import { useClient } from '@/composables/useClient'
import type { ClientStatsPanel } from '@/services/Client/domain/models/Client'
import type { AppointmentInfoPanelAdmin } from '@/models/AppointmentInfoPanelAdmin'
import type { ClientInfoPanel } from '@/models/ClientInfoPanel'
import type { ServicesInfoTopPanelAdmin } from '@/models/ServicesInfoTopPanelAdmin'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import { useRouter } from 'vue-router'
import { useSpecie } from '@/composables/useSpecie'
import type { TopSpeciesByAppointments } from '@/services/Specie/domain/models/Specie'
import ScrollPanel from 'primevue/scrollpanel'
import SkeletonPrimaryCard from '../../../components/SkeletonPrimaryCard.vue'
import SkeletonSecondaryCard from '@/components/SkeletonSecondaryCard.vue'

const { getMainRole, getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const {
  loading: loadingAppointment,
  getAppointmentsByDateForPanelManager,
  getTodayAppointmentStatsByHeadquarter,
  getTodayAppointmentStats,
  getAppointmentsByDateForPanelAdmin,
} = useAppointment()

const {
  loading: loadingVeterinary,
  getTopServicesForManager,
  getTopServicesForAdmin,
} = useVeterinaryService()

const {
  loading: loagingPayment,
  getPaymentStatsByHeadquarter,
  getCompletedPaymentsStats,
} = usePayment()

const {
  loading: loadingClient,

  getClientStatsByHeadquarter,
  getClientInfoPanelByHeadquarter,
  getClientStatsPanel,
  getClientInfoPanelAdmin,
} = useClient()

const servicesTop = ref<ServicesInfoTopPanelAdmin[]>([])

const clientsRecent = ref<ClientInfoPanel[]>([])

const appointmentsToday = ref<AppointmentInfoPanelAdmin[]>([])

const clientsStats = ref<ClientStatsPanel | null>(null)

const todayAppoinmentStats = ref<AppointmentStatsToday | null>(null)

const paymentStats = ref<PaymentStatsForPanelAdmin | null>(null)

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

const topsSpeciesGeneral = ref<TopSpeciesByAppointments | null>(null)

const paymentWeekly = ref<WeeklyIncome | null>(null)

const { getTopSpeciesByHeadquarter, getTopSpeciesGeneral } = useSpecie()

const { getWeeklyIncomeByHeadquarter, getWeeklyIncomeGeneral } = usePayment()

onMounted(async () => {
  await loadMyInfo()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
  chartDataSpecie.value = setChartDataSpecies()
  console.log(chartDataSpecie.value)
  chartOptionsSpecie.value = setChartOptionsSpecies()
})

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
  }
  const role = getMainRole()
  if (role != null) {
    if (role === 'Administrador') {
      todayAppoinmentStats.value = await getTodayAppointmentStats()
      paymentStats.value = await getCompletedPaymentsStats()
      clientsStats.value = await getClientStatsPanel()
      appointmentsToday.value = await getAppointmentsByDateForPanelAdmin()
      clientsRecent.value = await getClientInfoPanelAdmin()
      servicesTop.value = await getTopServicesForAdmin()
      topsSpeciesGeneral.value = await getTopSpeciesGeneral()
      paymentWeekly.value = await getWeeklyIncomeGeneral()
    } else {
      const headquarterId = myInfoEmployee.value?.headquarter.id
      if (headquarterId) {
        todayAppoinmentStats.value = await getTodayAppointmentStatsByHeadquarter(headquarterId)
        paymentStats.value = await getPaymentStatsByHeadquarter(headquarterId)
        clientsStats.value = await getClientStatsByHeadquarter(headquarterId)
        appointmentsToday.value = await getAppointmentsByDateForPanelManager(headquarterId)
        clientsRecent.value = await getClientInfoPanelByHeadquarter(headquarterId)
        servicesTop.value = await getTopServicesForManager(headquarterId)
        topsSpeciesGeneral.value = await getTopSpeciesByHeadquarter(headquarterId)
        paymentWeekly.value = await getWeeklyIncomeByHeadquarter(headquarterId)
      }
    }
  }

  console.log(topsSpeciesGeneral.value)
}

const news: { title: string; icon: string; content: string; plus?: string }[] = [
  {
    title: 'Pacientes activos',
    icon: 'pi-heart',
    content: '85',
    plus: '+8 este mes',
  },
]

const chartData = ref()
const chartOptions = ref()
const chartDataSpecie = ref()
const chartOptionsSpecie = ref()

//data and options for sales
const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: paymentWeekly.value?.days,
    datasets: [
      {
        label: 'Ingresos',
        data: paymentWeekly.value?.totals,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-pink-500'),
        tension: 0.4,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

//data and options for species

const setChartDataSpecies = () => {
  console.log('Desde function', topsSpeciesGeneral)
  console.log(topsSpeciesGeneral)
  return {
    labels: topsSpeciesGeneral.value?.speciesNames,
    datasets: [
      {
        label: 'Citas',
        data: topsSpeciesGeneral.value?.appointmentCounts,
        backgroundColor: [
          'rgba(249, 115, 22, 0.2)',
          'rgba(6, 182, 212, 0.2)',
          'rgb(107, 114, 128, 0.2)',
          'rgba(139, 92, 246 0.2)',
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(6, 182, 212)',
          'rgb(107, 114, 128)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 1,
      },
    ],
  }
}
const setChartOptionsSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const router = useRouter()
const redirect = (url: string) => {
  router.push(url)
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
          <SkeletonPrimaryCard
            v-if="
              loadingAppointment.getTodayAppointmentStatsByHeadquarter ||
              loadingAppointment.getTodayAppointmentStatsByHeadquarter
            "
          ></SkeletonPrimaryCard>
          <CardNewsPrimary
            v-if="todayAppoinmentStats"
            title="Citas hoy"
            icon="pi-calendar"
            :content="todayAppoinmentStats.totalAppointments.toString()"
            :plus="`+${todayAppoinmentStats.totalAppointments - todayAppoinmentStats.todayRegisteredAppointments} desde ayer`"
          >
          </CardNewsPrimary>
          <SkeletonPrimaryCard
            v-if="
              loadingAppointment.getAppointmentsByDateForPanelManager ||
              loadingAppointment.getAppointmentsByDateForPanelAdmin
            "
          ></SkeletonPrimaryCard>
          <CardNewsPrimary
            v-if="paymentStats"
            title="Ingresos del mes"
            icon="pi-chart-line"
            :content="paymentStats.currentTotal.toString()"
            :plus="`${paymentStats.percentageDifference} vs mes anterior`"
          ></CardNewsPrimary>
          <SkeletonPrimaryCard
            v-if="
              loagingPayment.getCompletedPaymentsStats ||
              loagingPayment.getPaymentStatsByHeadquarter
            "
          ></SkeletonPrimaryCard>
          <CardNewsPrimary
            v-if="clientsStats"
            title="Clientes"
            icon="pi-user"
            :content="clientsStats.totalClients.toString()"
            :plus="`${clientsStats.difference} este mes`"
          ></CardNewsPrimary>

          <CardNewsPrimary
            v-for="(noticia, index) in news"
            :key="index"
            :title="noticia.title"
            :icon="noticia.icon"
            :content="noticia.content"
            :plus="noticia.plus"
          >
          </CardNewsPrimary>
        </div>
        <!-- section 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 lg:gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Proximas citas</h2>
                <Button hidden label="Nueva Cita" icon="pi pi-plus"> </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Citas programadas para hoy</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <div class="flex flex-col gap-2">
                  <SkeletonSecondaryCard
                    v-if="
                      loadingAppointment.getAppointmentsByDateForPanelAdmin ||
                      loadingAppointment.getAppointmentsByDateForPanelManager
                    "
                  />

                  <div
                    class="flex min-h-44 max-h-56 items-center justify-center"
                    v-if="appointmentsToday.length === 0"
                  >
                    <p>No tiene citas agendadas</p>
                  </div>
                  <ScrollPanel v-if="appointmentsToday.length > 0" class="min-h-44 max-h-56">
                    <CardAppintmentTerciary
                      v-for="(appointment, index) of appointmentsToday"
                      :key="index"
                      :pet-name="appointment.petName"
                      :service-name="appointment.serviceName"
                      :owner-name="appointment.clientName"
                      :time="appointment.hour"
                      :status="appointment.status"
                    >
                    </CardAppintmentTerciary>
                  </ScrollPanel>
                </div>
              </div>
            </template>
            <template #footer>
              <Button
                label="Ver todas las citas"
                variant="text"
                icon="pi pi-eye"
                size="small"
                class="w-full"
                @click="redirect('appoinment-management')"
              >
              </Button>
            </template>
          </Card>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12"
          >
            <!-- servicios mas pedidos -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <p>Servicios más perdidos</p>
              </template>
              <template #content>
                <SkeletonSecondaryCard
                  v-if="
                    loadingVeterinary.getTopServicesForManager ||
                    loadingVeterinary.getTopServicesForAdmin
                  "
                />
                <ScrollPanel v-if="servicesTop.length > 0" class="h-56">
                  <ServiceRankingItem
                    v-for="(service, index) of servicesTop"
                    :key="index"
                    :serviceName="service.name"
                    :serviceImageUrl="service.imageServiceUrl"
                    :categoryName="service.categoryName"
                    :value="service.totalCares"
                  >
                  </ServiceRankingItem>
                </ScrollPanel>
                <div class="flex h-56 items-center justify-center" v-if="servicesTop.length === 0">
                  <p>No servicios que mostrar</p>
                </div>
              </template>
            </Card>
            <!-- clientes recientes -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex items-center justify-between">
                  <p>Clientes recientes</p>
                  <Button
                    variant="outlined"
                    rounded
                    icon="pi pi-plus"
                    v-tooltip.left="`Agregar cliente`"
                    hidden
                  >
                  </Button>
                </div>
              </template>
              <template #content>
                <SkeletonSecondaryCard
                  v-if="
                    loadingClient.getClientInfoPanelAdmin ||
                    loadingClient.getClientInfoPanelByHeadquarter
                  "
                />
                <ScrollPanel v-if="clientsRecent.length > 0" class="h-56">
                  <ClientRankingItem
                    v-for="(client, index) of clientsRecent"
                    :key="index"
                    :clientFullName="client.fullName"
                    :clientInitials="client.initials"
                    :clientDni="client.phone"
                  ></ClientRankingItem>
                </ScrollPanel>

                <div
                  class="flex size-full items-center justify-center"
                  v-if="clientsRecent.length === 0"
                >
                  <p>No hay clientes que mostrar</p>
                </div>
                <div></div>
              </template>
              <template #footer>
                <Button
                  label="Ver todos los clientes"
                  variant="text"
                  icon="pi pi-users"
                  size="small"
                  class="mt-2 w-full"
                  @click="redirect('client-management')"
                >
                </Button>
              </template>
            </Card>
          </div>
        </div>
        <!-- seccion 3 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 lg:gap-x-12 mt-4">
          <Card class="card-primary">
            <template #title>
              <p>Ingresos de la última semana</p>
            </template>
            <template #content>
              <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
            </template>
          </Card>

          <Card class="card-primary">
            <template #title>
              <p>Especies por citas</p>
            </template>
            <template #content>
              <div class="w-full min-h-full flex items-end justify-center">
                <Chart
                  type="bar"
                  :data="chartDataSpecie"
                  :options="chartOptionsSpecie"
                  class="h-[30rem] w-full flex items-center"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
