<script lang="ts" setup>
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppointmentQuintary from '@/components/CardAppointmentQuintary.vue'
import CardPetWaiting from '@/components/CardPetWaiting.vue'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import CardVeterinaryRecord from '@/components/CardVeterinaryRecord.vue'
import ScrollPanel from 'primevue/scrollpanel'
import CardPetTerciary from '@/components/CardPetTerciary.vue'
import { useAppointment } from '@/composables/useAppointment'
import type { AppointmentStatsToday } from '@/services/Appointment/domain/models/Appointment'
import type { CareAndAppointmentPanelEmployee } from '@/models/CareAndAppointmentPanelEmployee'
import { useRouter } from 'vue-router'
import { useCare } from '@/composables/useCare'
import type { VeterinaryRecordStats } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import type { RecentMedicalRecord } from '@/models/RecentMedicalRecord'
import type { RecentPatient } from '@/models/RecentPatient'
import type {
  MonthlyCareStatsVeterinary,
  WeeklyCareStatsVeterinary,
} from '@/services/Care/domain/models/Care'
import type { StatsVeterinarianPanel } from '@/services/Employee/domain/models/Employee'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const { getCareAndAppointmentsForEmployee } = useAppointment()
const appointments = ref<CareAndAppointmentPanelEmployee[]>([])


  //for stats
const {getVeterinarianPanelStatsToday} = useEmployee()

const statsAdditionals = ref<StatsVeterinarianPanel|null>(null)

  const statsRecords = ref<VeterinaryRecordStats | null>(null)

const {
  getWeeklyPerformanceGraphicByVeterinary,
  getMonthlyPerformanceStatsByVeterinary,
  getRecentPatientsByEmployee,
  getCaresForEmployee,
} = useCare()

const monthlyPerformanceStats = ref<MonthlyCareStatsVeterinary | null>(null)

const weeklyPerformanceGraficInfo = ref<WeeklyCareStatsVeterinary | null>(null)

const recentsPacients = ref<RecentPatient[]>([])

const { getRecentRecordsByEmployee, getStatsByVeterinarian } = useVeterinaryRecord()

const careRecents = ref<CareAndAppointmentPanelEmployee[]>([])

const { getTodayAppointmentStatsByHeadquarter } = useAppointment()

const appointmentStats = ref<AppointmentStatsToday | null>(null)

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

onMounted(async () => {
  await loadMyInfo()
  chartData.value = setChartData()
  console.log(weeklyPerformanceGraficInfo.value)
  chartOptions.value = setChartOptions()
})

const chartData = ref()
const chartOptions = ref()

//data and options for sales
const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: weeklyPerformanceGraficInfo.value?.weekLabels,
    datasets: [
      {
        label: 'Atenciones',
        data: weeklyPerformanceGraficInfo.value?.totalCares,
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

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
    appointmentStats.value = await getTodayAppointmentStatsByHeadquarter(
      myInfoEmployee.value.headquarter.id,
    )
    monthlyPerformanceStats.value = await getMonthlyPerformanceStatsByVeterinary(entityIdGet)
    weeklyPerformanceGraficInfo.value = await getWeeklyPerformanceGraphicByVeterinary(entityIdGet)
    careRecents.value = await getCareAndAppointmentsForEmployee(entityIdGet)
    appointments.value = await getCaresForEmployee(entityIdGet)
    statsRecords.value = await getStatsByVeterinarian(entityIdGet)
    recentsPacients.value = await getRecentPatientsByEmployee(entityIdGet)
    recentRecords.value = await getRecentRecordsByEmployee(entityIdGet)
  statsAdditionals.value = await getVeterinarianPanelStatsToday(entityIdGet)
  }
}



const recentRecords = ref<RecentMedicalRecord[]>([])


const appoinmentsAbstract: { title: string; value: number }[] = [
  {
    title: 'Completadas',
    value: 1,
  },
  {
    title: 'En curso',
    value: 1,
  },
  {
    title: 'Pendientes',
    value: 5,
  },
]

const router = useRouter()

const redirect = (url: string) => {
  router.push(url)
}

const handleRedirectAppointment = (appointmentId: number) => {
  redirect(`appointments/attend/${appointmentId}`)
}

const handleRedirectPet = (petId: number) => {
  redirect(`pets-management/pet/${petId}`)
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          Bienvenido Dr.
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
    v-if="appointmentStats"
    title="Citas hoy"
    icon="pi-calendar"
    :content="appointmentStats.totalAppointments.toString()"
  >
  </CardNewsPrimary>

  <CardNewsPrimary
    v-if="statsAdditionals"
    title="Atenciones registradas hoy"
    icon="pi-clipboard"
    :content="statsAdditionals.totalCares.toString()"
  >
  </CardNewsPrimary>

  <CardNewsPrimary
    v-if="statsAdditionals"
    title="N° de mascotas atendidas hoy"
    icon="pi-clipboard"
    :content="statsAdditionals.totalPatients.toString()"
  >
  </CardNewsPrimary>

  <CardNewsPrimary
    v-if="statsAdditionals"
    title="N° de reportes hoy"
    icon="pi-clipboard"
    :content="statsAdditionals.totalRecords.toString()"
  >
  </CardNewsPrimary>
</div>
        <!-- quicky actions -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <div class="flex gap-2 items-center">
              <i class="pi pi-clipboard"></i>
              <p>Acciones rápidas</p>
            </div>
          </template>
          <template #subtitle>
            <p>Funciones más utilizadas</p>
            <div
              class="grid grid-cols-1 xs:grid-cols-2 gap-y-4  gap-x-6 lg:gap-x-12 mt-2"
            >
              <Button
                label="Atender cita"
                iconPos="top"
                icon="pi pi-clipboard"
                severity="success"
                @click="redirect('/employee/veterinary/appointments')"
              ></Button>
              <Button
                label="Buscar paciente"
                iconPos="top"
                icon="pi pi-search"
                severity="info"
                @click="redirect('/employee/veterinary/pets-management')"
              ></Button>
            </div>
          </template>
        </Card>
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-calendar"></i>
                  <h2 class="h3 font-semibold">Citas de Hoy</h2>
                </div>

                <Tag
                  :value="`${appointments.length} citas`"
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
                <ScrollPanel v-if="appointments.length > 0" class="h-122">
                  <CardAppointmentQuintary
                    v-for="appoinment of appointments"
                    :appointement-id="appoinment.id"
                    :key="appoinment.id"
                    :pet-name="appoinment.pet.name"
                    :pet-id="appoinment.pet.id"
                    :pet-breed="''"
                    :service-name="appoinment.serviceName"
                    :service-duration="''"
                    :owner-name="appoinment.clientName"
                    :time="appoinment.hour"
                    :status="appoinment.status"
                    @view-pet="handleRedirectPet($event)"
                    @redirect-appointment="handleRedirectAppointment($event)"
                  ></CardAppointmentQuintary>
                </ScrollPanel>
                <div
                  class="flex min-h-120 max-h-122 items-center justify-center"
                  v-if="appointments.length === 0"
                >
                  <p>No citas que mostrar</p>
                </div>
                <!-- abstract  -->

                <div
                  v-if="statsRecords"
                  class="p-4 shadow-none border-1 rounded-sm border-blue-500 bg-blue-50 dark:bg-transparent w-full flex flex-col gap-2 xl:flex-row justify-between items-center"
                >
                  <div class="flex gap-4">
                    <div
                      v-for="(abstract, index) of appoinmentsAbstract"
                      :key="index"
                      class="text-blue-600 dark:text-blue-400 text-center"
                    >
                      <p class="textLg">
                        {{ abstract.title }}
                      </p>
                      <p class="H3 font-bold">
                        {{ abstract.value }}
                      </p>
                    </div>
                  </div>
                  <Button
                    label="Ver agenda completa"
                    class="w-full xl:w-auto"
                    variant="outlined"
                    severity="secondary"
                    @click="redirect('appointments')"
                  />
                </div>
              </div>
            </template>
          </Card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12">
            <!-- waiting room -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <div class="flex gap-2 items-center">
                    <i class="pi pi-users"></i>
                    <h2 class="h3 font-semibold">Sala de espera</h2>
                  </div>
                  <Tag
                    :value="`${careRecents.length} esperando`"
                    severity="secondary"
                    class="self-start"
                  ></Tag>
                </div>
              </template>
              <template #subtitle>
                <p>Clientes en espera</p>
              </template>
              <template #content>
                <ScrollPanel v-if="careRecents.length > 0" class="h-122">
                  <div class="w-full flex flex-col gap-1">
                    <CardPetWaiting
                      v-for="(care, index) of careRecents"
                      :key="index"
                      :client-name="care.clientName"
                      :pet-name="care.pet.name"
                      :service-name="care.serviceName"
                      breed-name=""
                    />
                  </div>
                </ScrollPanel>
                <div
                  class="flex min-h-120 max-h-122 items-center justify-center"
                  v-if="careRecents.length === 0"
                >
                  <p>No clientes que mostrar</p>
                </div>
              </template>
            </Card>
            <!-- stadistics -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <div class="flex gap-2 items-center">
                    <i class="pi pi-chart-line"></i>
                    <h2 class="h3 font-semibold">Estadísticas</h2>
                  </div>
                  <Button
                    label="Exportar"
                    severity="secondary"
                    icon-pos="left"
                    icon=" pi pi-download"
                    size="small"
                    class="py-1.5"
                    hidden
                  />
                </div>
              </template>
              <template #subtitle>
                <p>Resumen de su actividad</p>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-2">
                  <div class="flex gap-2 items-center">
                    <i class="pi pi-calendar"></i>
                    <h2 class="h3 font-semibold">Del mes {{ monthlyPerformanceStats?.month }}</h2>
                  </div>
                  <!-- card news -->
                  <div class="w-full grid grid-cols-1 3xl:grid-cols-2 gap-y-3 gap-x-6">
                    <CardNewsPrimary
                      v-if="monthlyPerformanceStats"
                      title="Pacientes"
                      icon="pi-github"
                      :content="monthlyPerformanceStats.totalPatients.toString()"
                    >
                    </CardNewsPrimary>
                           <CardNewsPrimary
                      v-if="monthlyPerformanceStats"
                      title="Atenciones"
                      icon="pi-clipboard"
                      :content="monthlyPerformanceStats.totalCares.toString()"
                    >
                    </CardNewsPrimary>
                  </div>
                  <h2 class="h3 font-semibold">Atenciones del ultimo mes</h2>
                  <div class="flex-1">
                    <Chart
                      type="line"
                      :data="chartData"
                      :options="chartOptions"
                      class="w-full h-min"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
          <!-- last diagnosis  -->
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-file"></i>
                  <h2 class="h3 font-semibold">Ultimos diagnosticos</h2>
                </div>
                <Tag
                  :value="`${recentRecords.length} registros`"
                  severity="secondary"
                  class="self-start"
                ></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Historial de diagnostico recientes</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5 items-end" v-if="statsRecords">
                <!-- abstract -->
                <div class="w-full grid grid-cols-1 sm:grid-cols-2 3xl:grid-cols-4 gap-y-3 gap-x-6">
                  <CardNewsPrimary
                    title="En curso"
                    icon="pi-clock"
                    :content="statsRecords.enCurso.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Completado"
                    icon="pi-check-circle"
                    :content="statsRecords.completado.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Observación"
                    icon="pi-info-circle"
                    :content="statsRecords.observacion.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Total"
                    icon="pi-file"
                    :content="statsRecords.total.toString()"
                  >
                  </CardNewsPrimary>
                </div>
                <ScrollPanel class="h-122 mt-2 w-full">
                  <CardVeterinaryRecord
                    class="mb-2"
                    v-for="record in recentRecords"
                    :key="record.id"
                    :record-id="record.id"
                    :date="record.recordMedicalDate"
                    :pet-name="record.petName"
                    :breed-name="record.breedName"
                    :status="record.status"
                    :service-name="record.serviceName"
                    :client-name="record.clientFullName"
                    :diagnosis-content="record.diagnosis"
                    :treatment="record.treatment"
                    :observations="record.observations"
                    :petId="record.petId"
                  ></CardVeterinaryRecord
                ></ScrollPanel>

                <Button
                  class="mt-2"
                  iconPos="right"
                  icon="pi pi-arrow-right"
                  label="Ver historial completo"
                  variant="text"
                  severity="info"
                  hidden
                />
              </div>
              <div class="flex min-h-120 max-h-122 items-center justify-center" v-else>
                <p>No hay diagnosticos que mostrar</p>
              </div>
            </template>
          </Card>
          <!-- pet recent -->
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-heart"></i>
                  <h2 class="h3 font-semibold">Pacientes Recientes</h2>
                </div>
                <Tag
                  :value="`${recentsPacients.length} pacientes`"
                  severity="secondary"
                  class="self-start"
                ></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Historial de pacientes atendidos recientemente</p>
            </template>
            <template #content>
              <ScrollPanel v-if="recentsPacients.length > 0" class="h-156 mt-2 w-full">
                <div class="w-full flex flex-col gap-1.5 items-end">
                  <CardPetTerciary
                    v-for="pet of recentsPacients"
                    :key="pet.petId"
                    :pet-id="pet.petId"
                    :pet-name="pet.petName"
                    :pet-breed="pet.breedName"
                    :pet-image="''"
                    :pet-weight="pet.petWeight"
                    :pet-gender="pet.petSex"
                    :pet-birtdate="pet.petBirthdate"
                    :owner-name="pet.clientFullName"
                    :last-appoinment-date="pet.lastVisitDate"
                    @view-pet="handleRedirectPet($event)"
                  /></div
              ></ScrollPanel>
              <div
                class="flex min-h-120 max-h-122 items-center justify-center"
                v-if="recentsPacients.length === 0"
              >
                <p>No hay mascotas que mostrar</p>
              </div>
              <Button
                class="mt-2 w-full"
                iconPos="right"
                icon="pi pi-arrow-right"
                label="Ver historial completo"
                variant="text"
                @click="redirect('/employee/veterinary/pets-management')"
              />
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
